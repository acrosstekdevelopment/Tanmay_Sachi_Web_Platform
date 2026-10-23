import { z } from "zod";

/*
 * The Contact enquiry (TDD §10.2, leads table in supabase/migrations/0005).
 * One schema validates the form on the server before anything is written.
 */

/** The privacy notice shown under the form. Bump when that text changes; it is stored with every lead. */
export const CONTACT_CONSENT_NOTICE_VERSION = "contact-2026-10-23";

/** "I am getting in touch about", in the Approved Design's order, with the database value for each. */
export const ENQUIRY_TYPES = [
  ["csr_partnership", "A CSR partnership"],
  ["institutional_partnership", "A government or institutional partnership"],
  ["grant", "A grant or foundation enquiry"],
  ["volunteering", "Volunteering or contributing skills"],
  ["scheme_help", "Help with a scheme or application"],
  ["media", "Media"],
  ["other", "Something else"],
] as const;

/** Spam checks (§12): a field people never see, and a minimum time to fill the form. */
export const HONEYPOT_FIELD = "website";
export const MIN_FILL_MS = 3000;

const optional = (max: number) =>
  z.string().trim().max(max).transform((v) => (v === "" ? null : v));

export const enquirySchema = z
  .object({
    enquiry_type: z.enum(ENQUIRY_TYPES.map(([value]) => value) as [string, ...string[]]),
    name: z.string().trim().min(1, "name").max(200),
    organisation: optional(200),
    email: optional(320).pipe(z.email("email").nullable()),
    phone: optional(40),
    message: z.string().trim().min(1, "message").max(5000),
  })
  .refine((v) => v.email !== null || v.phone !== null, { message: "contact", path: ["email"] });

/** What the visitor typed, handed back so a failed send does not empty the form. */
export type EnquiryValues = Partial<Record<"enquiry_type" | "name" | "organisation" | "email" | "phone" | "message", string>>;

export type EnquiryState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "invalid"; fields: Array<"name" | "email" | "message" | "contact">; values: EnquiryValues }
  | { status: "error"; values?: EnquiryValues };
