import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { AmountPicker } from "@/components/give/amount-picker";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Button, TextLink } from "@/components/ui/primitives";

// Ported verbatim from the Approved Design, page #p-give.
// Pass 1 (BUILD_GUIDE §0): static copy from the mockup; data comes in pass 2.

export const metadata: Metadata = { title: "Give" };

export default function GivePage() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">
              Home
            </Link>
            {" "}
            / Give
          </div>
          <h1 className="h-xl" style={{ maxWidth: "15ch" }}>
            Give with purpose.
          </h1>
          <p className="lede" style={{ marginTop: "16px", maxWidth: "54ch" }}>
            Every amount below traces to a line in a real project budget. Choose one and we will tell you exactly what it buys.
          </p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="two lean give">
            <div>
              <h4 className="h-sm">
                Where should it go?
              </h4>
              <ToggleGroup className="askrow" style={{ marginTop: "12px" }} label="Where should it go?" items={["Where most needed", "Women's independence", "Learning", "Skills", "A specific project"]} />
              <h4 className="h-sm" style={{ marginTop: "26px" }}>
                How much?
              </h4>
              <AmountPicker />
              <h4 className="h-sm" style={{ marginTop: "26px" }}>
                How often?
              </h4>
              <ToggleGroup className="askrow" style={{ marginTop: "12px" }} label="How often?" items={["Monthly", "Once"]} />
              <p className="small" style={{ marginTop: "10px" }}>
                ₹2,500 a month is ₹30,000 over a year. Monthly giving runs on UPI Autopay and you can stop it in one tap.
              </p>
              <h4 className="h-sm" style={{ marginTop: "26px" }}>
                Your details
              </h4>
              <div style={{ marginTop: "12px", maxWidth: "520px" }}>
                <div className="field">
                  <label htmlFor="dn">
                    Full name
                  </label>
                  <input id="dn" placeholder="As it should appear on the receipt" />
                </div>
                <div className="field">
                  <label htmlFor="de">
                    Email
                  </label>
                  <input id="de" type="email" placeholder="For your receipt" />
                </div>
                <div className="field">
                  <label htmlFor="dp">
                    PAN
                  </label>
                  <input id="dp" placeholder="ABCDE1234F" />
                  <div className="hint">
                    Required to issue your tax certificate under Form 10BE. Stored encrypted, never shared.
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="da">
                    Address
                  </label>
                  <input id="da" placeholder="Required for the donation statement we file" />
                </div>
                <label className="small" style={{ display: "flex", gap: "9px", alignItems: "flex-start", marginBottom: "16px" }}>
                  <input type="checkbox" style={{ width: "auto", marginTop: "4px" }} />
                  {" "}
                  <span>
                    Send me one email a month about the work. Unticked by default, and you can withdraw at any time.
                  </span>
                </label>
                {" "}
                <Button full href="#">
                  Continue to payment
                </Button>
                <p className="small" style={{ marginTop: "10px" }}>
                  UPI, cards and netbanking. Four screens, no account needed.
                </p>
              </div>
            </div>
            <aside className="rail">
              <h4 className="h-sm">
                Who you are giving to
              </h4>
              <dl>
                <dt>
                  Registered name
                </dt>
                <dd>
                  Tanmaysaachi Mahila Empower Foundation
                </dd>
                <dt>
                  Legal form
                </dt>
                <dd>
                  Section 8 non-profit
                </dd>
                <dt>
                  CIN
                </dt>
                <dd className="ph">
                  ——
                </dd>
                <dt>
                  PAN
                </dt>
                <dd className="ph">
                  ——
                </dd>
              </dl>
              <p className="railnote">
                <strong>
                  80G status.
                </strong>
                {" "}
                <span className="ph">
                  Displayed honestly from the credential record. Where 80G is not granted, this states that no tax certificate can be issued.
                  {/* cms: credential[80g].public_note */}
                </span>
              </p>
              <p className="railnote">
                <strong>
                  FCRA.
                </strong>
                {" "}
                Not registered. We cannot accept donations from foreign sources.
              </p>
              <p className="railnote">
                <strong>
                  Tax deduction.
                </strong>
                {" "}
                The deduction for donations is available only under the old tax regime. If you are on the new regime, your donation still funds the work but will not reduce your tax.
              </p>
              <p className="railnote">
                <TextLink href="#">
                  Refund and cancellation policy
                </TextLink>
                {" "}
                ·
                {" "}
                <TextLink href="#">
                  Privacy notice
                </TextLink>
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
