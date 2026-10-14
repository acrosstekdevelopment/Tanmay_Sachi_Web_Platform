import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/primitives";

// Ported verbatim from the Approved Design, page #p-contact.
// Pass 1 (BUILD_GUIDE §0): static copy from the mockup; data comes in pass 2.

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
              <div className="field">
                <label htmlFor="ct">
                  I am getting in touch about
                </label>
                {" "}
                <select id="ct">
                  <option>
                    A CSR partnership
                  </option>
                  <option>
                    A government or institutional partnership
                  </option>
                  <option>
                    A grant or foundation enquiry
                  </option>
                  <option>
                    Volunteering or contributing skills
                  </option>
                  <option>
                    Help with a scheme or application
                  </option>
                  <option>
                    Media
                  </option>
                  <option>
                    Something else
                  </option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="cn">
                  Name
                </label>
                <input id="cn" />
              </div>
              <div className="field">
                <label htmlFor="co">
                  Organisation
                </label>
                <input id="co" placeholder="If applicable" />
              </div>
              <div className="field">
                <label htmlFor="ce">
                  Email
                </label>
                <input id="ce" type="email" />
              </div>
              <div className="field">
                <label htmlFor="cp">
                  Phone or WhatsApp
                </label>
                <input id="cp" />
              </div>
              <div className="field">
                <label htmlFor="cm">
                  What would you like to discuss?
                </label>
                <textarea id="cm" rows={5} />
              </div>
              <p className="small" style={{ marginBottom: "16px" }}>
                We use these details only to reply to you and, where relevant, to keep a record of the enquiry. We do not share them. You can ask us to delete them at any time by writing to our grievance contact.
                {/* cms: consent_notice_version stored with the lead */}
              </p>
              <Button href="#">
                Send enquiry
              </Button>
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
