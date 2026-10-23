"use client";

import { startTransition, useActionState, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitEnquiry } from "@/app/[locale]/(public)/contact/actions";
import { Button } from "@/components/ui/primitives";
import { ENQUIRY_TYPES, HONEYPOT_FIELD, type EnquiryState } from "@/lib/forms/enquiry";

/*
 * The Contact form (`#p-contact`), markup unchanged from the Approved Design,
 * now sent to the leads table through a server action. Works without
 * JavaScript too: the form posts to the action directly.
 */
export function ContactForm() {
  const locale = useLocale();
  const t = useTranslations("Contact");
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, { status: "idle" });
  // Set once on first render; the server rejects forms sent faster than a person types.
  const [startedAt] = useState(() => Date.now());

  // With JavaScript, send without React's automatic form reset, so a failed send
  // keeps what was typed (the reset would also put the select back to its first
  // choice). Without JavaScript the form posts to the same action, and the
  // values handed back refill it.
  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => action(data));
  }
  const invalid = state.status === "invalid" ? state.fields : [];
  const values = state.status === "invalid" || state.status === "error" ? (state.values ?? {}) : {};

  if (state.status === "sent") {
    return (
      <div role="status">
        <h2 className="h-sm">{t("sentTitle")}</h2>
        <p className="small" style={{ marginTop: "10px" }}>
          {t("sentBody")}
        </p>
      </div>
    );
  }

  return (
    <form action={action} onSubmit={send} noValidate>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="started_at" value={startedAt} />
      <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" aria-hidden="true" hidden />
      <div className="field">
        <label htmlFor="ct">
          I am getting in touch about
        </label>
        {" "}
        <select id="ct" name="enquiry_type" defaultValue={values.enquiry_type}>
          {ENQUIRY_TYPES.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="cn">
          Name
        </label>
        <input id="cn" name="name" defaultValue={values.name} autoComplete="name" aria-invalid={invalid.includes("name") || undefined} />
      </div>
      <div className="field">
        <label htmlFor="co">
          Organisation
        </label>
        <input id="co" name="organisation" defaultValue={values.organisation} autoComplete="organization" placeholder="If applicable" />
      </div>
      <div className="field">
        <label htmlFor="ce">
          Email
        </label>
        <input
          id="ce"
          name="email"
          defaultValue={values.email}
          type="email"
          autoComplete="email"
          aria-invalid={invalid.includes("email") || invalid.includes("contact") || undefined}
        />
      </div>
      <div className="field">
        <label htmlFor="cp">
          Phone or WhatsApp
        </label>
        <input id="cp" name="phone" defaultValue={values.phone} type="tel" autoComplete="tel" aria-invalid={invalid.includes("contact") || undefined} />
      </div>
      <div className="field">
        <label htmlFor="cm">
          What would you like to discuss?
        </label>
        <textarea id="cm" name="message" defaultValue={values.message} rows={5} aria-invalid={invalid.includes("message") || undefined} />
      </div>
      <p className="small" style={{ marginBottom: "16px" }}>
        We use these details only to reply to you and, where relevant, to keep a record of the enquiry. We do not share them. You can ask us to delete them at any time by writing to our grievance contact.
      </p>
      {(state.status === "invalid" || state.status === "error") && (
        <p className="small" role="alert" style={{ marginBottom: "16px", color: "var(--coral-ink)" }}>
          {state.status === "error" ? t("error") : invalid.map((f) => t(`invalid.${f}`)).join(" ")}
        </p>
      )}
      <Button type="submit" disabled={pending}>
        Send enquiry
      </Button>
    </form>
  );
}
