import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

// Ported verbatim from the Approved Design, page #p-contact.
// Pass 1 (BUILD_GUIDE §0): static copy from the mockup; the enquiry form
// writes to the leads table (TDD §10.2).

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">
              Home
            </Link>
            {" "}
            / Contact
          </div>
          <h1 className="h-xl" style={{ maxWidth: "16ch" }}>
            Tell us what you need.
          </h1>
          <p className="lede" style={{ marginTop: "16px", maxWidth: "52ch" }}>
            Different enquiries go to different people. Choosing correctly gets you a faster and better answer.
          </p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="two lean">
            <div style={{ maxWidth: "560px" }}>
              <ContactForm />
              <p className="small" style={{ marginTop: "10px" }}>
                We reply to every enquiry within five working days.
              </p>
            </div>
            <aside>
              <div style={{ border: "1px solid var(--rule)", padding: "22px" }}>
                <h4 className="h-sm">
                  Direct contacts
                </h4>
                <dl className="small" style={{ marginTop: "12px" }}>
                  <dt style={{ color: "var(--ink50)" }}>
                    Partnerships
                  </dt>
                  <dd className="ph">
                    Named person · designation · direct line
                  </dd>
                  <dt style={{ color: "var(--ink50)", marginTop: "12px" }}>
                    Programmes
                  </dt>
                  <dd className="ph">
                    Named person · designation
                  </dd>
                  <dt style={{ color: "var(--ink50)", marginTop: "12px" }}>
                    Grievance redressal
                  </dt>
                  <dd className="ph">
                    Named person · email · 90-day response
                  </dd>
                  <dt style={{ color: "var(--ink50)", marginTop: "12px" }}>
                    Registered office
                  </dt>
                  <dd className="ph">
                    Address
                  </dd>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
