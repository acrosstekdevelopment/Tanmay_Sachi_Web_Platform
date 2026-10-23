"use server";

import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import {
  CONTACT_CONSENT_NOTICE_VERSION,
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  enquirySchema,
  type EnquiryState,
  type EnquiryValues,
} from "@/lib/forms/enquiry";
import { publicDb } from "@/lib/supabase/public";

/**
 * Saves a Contact enquiry as a lead. The row is written with the public key,
 * which may add a lead but never read one back (TDD §7.5). No personal data is
 * logged (§12).
 */
export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  const locale = String(form.get("locale"));
  if (!hasLocale(routing.locales, locale)) return { status: "error" };

  // Spam: a filled hidden field, or a form sent faster than a person can type,
  // is answered as if it were accepted and quietly dropped.
  const startedAt = Number(form.get("started_at"));
  if (form.get(HONEYPOT_FIELD) || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "sent" };
  }

  const values: EnquiryValues = {};
  for (const key of ["enquiry_type", "name", "organisation", "email", "phone", "message"] as const) {
    values[key] = String(form.get(key) ?? "");
  }

  const parsed = enquirySchema.safeParse(values);
  if (!parsed.success) {
    const fields = new Set(parsed.error.issues.map((i) => i.message));
    return {
      status: "invalid",
      fields: (["name", "email", "message", "contact"] as const).filter((f) => fields.has(f)),
      values,
    };
  }

  const db = publicDb();
  if (!db) return { status: "error", values };
  const { error } = await db.from("leads").insert({
    ...parsed.data,
    source_page: `/${locale}/contact`,
    locale,
    consent_notice_version: CONTACT_CONSENT_NOTICE_VERSION,
  });
  if (error) {
    console.error("enquiry insert failed", error.code);
    return { status: "error", values };
  }
  return { status: "sent" };
}
