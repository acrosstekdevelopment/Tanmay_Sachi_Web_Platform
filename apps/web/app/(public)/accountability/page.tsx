import Link from "next/link";
import type { Metadata } from "next";
import { Led, Shot } from "@/components/ui/primitives";

// Ported verbatim from the Approved Design, page #p-accountability.
// Pass 1 (BUILD_GUIDE §0): static copy from the mockup; data comes in pass 2.

export const metadata: Metadata = { title: "Accountability" };

export default function AccountabilityPage() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">
              Home
            </Link>
            {" "}
            / Accountability
          </div>
          <h1 className="h-xl" style={{ maxWidth: "17ch" }}>
            Trust deserves transparency.
          </h1>
          <p className="lede" style={{ marginTop: "18px", maxWidth: "58ch" }}>
            Everything a funder, a journalist or a sceptical donor would want to check, on one page, including the things we do not have.
          </p>
        </div>
      </div>
      <section className="tight">
        <div className="wrap">
          <Led>Legal identity and registrations</Led>
          <table className="ledger">
            <thead>
              <tr>
                <th>
                  Credential
                </th>
                <th>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Registered name
                </td>
                <td>
                  Tanmaysaachi Mahila Empower Foundation
                </td>
              </tr>
              <tr>
                <td>
                  Legal form
                </td>
                <td>
                  Section 8 company
                </td>
              </tr>
              <tr>
                <td>
                  CIN
                </td>
                <td className="ph">
                  ——
                  {/* cms: org.cin */}
                </td>
              </tr>
              <tr>
                <td>
                  PAN
                </td>
                <td className="ph">
                  ——
                </td>
              </tr>
              <tr>
                <td>
                  Registered office
                </td>
                <td className="ph">
                  ——
                </td>
              </tr>
              <tr>
                <td>
                  NGO Darpan ID
                </td>
                <td className="ph">
                  ——
                </td>
              </tr>
              <tr>
                <td>
                  12AB
                </td>
                <td className="ph">
                  ——
                  {/* cms: renders only if granted */}
                </td>
              </tr>
              <tr>
                <td>
                  80G
                </td>
                <td className="ph">
                  ——
                </td>
              </tr>
              <tr>
                <td>
                  CSR-1
                </td>
                <td className="ph">
                  ——
                </td>
              </tr>
              <tr>
                <td>
                  FCRA
                </td>
                <td>
                  Not registered. We do not accept foreign contributions.
                </td>
              </tr>
            </tbody>
          </table>
          <p className="small" style={{ marginTop: "14px" }}>
            A credential appears here only when the certificate is in hand and the number is on file. Anything showing a dash is not held, or not yet granted. We do not write &quot;coming soon&quot;.
          </p>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <Led>Governance</Led>
          <div className="two lean" style={{ alignItems: "end", marginBottom: "24px" }}>
            <h2 className="h-lg" style={{ maxWidth: "20ch" }}>
              Named people, with declared interests.
            </h2>
            <p className="lede">
              If a person cannot be named, they are not on this site. No stock portraits, no &quot;our team of dedicated professionals&quot;.
            </p>
          </div>
          <div className="four">
            <div>
              <Shot style={{ minHeight: "150px" }}>
                <p>
                  Board portrait
                  {/* cms: person.photo */}
                </p>
              </Shot>
              <h4 className="h-sm ph" style={{ marginTop: "12px" }}>
                Name
              </h4>
              <p className="small ph">
                Designation · one-line credential
              </p>
            </div>
            <div>
              <Shot style={{ minHeight: "150px" }}>
                <p>
                  Board portrait
                </p>
              </Shot>
              <h4 className="h-sm ph" style={{ marginTop: "12px" }}>
                Name
              </h4>
              <p className="small ph">
                Designation · one-line credential
              </p>
            </div>
            <div>
              <Shot style={{ minHeight: "150px" }}>
                <p>
                  Board portrait
                </p>
              </Shot>
              <h4 className="h-sm ph" style={{ marginTop: "12px" }}>
                Name
              </h4>
              <p className="small ph">
                Designation · one-line credential
              </p>
            </div>
            <div>
              <Shot style={{ minHeight: "150px" }}>
                <p>
                  Board portrait
                </p>
              </Shot>
              <h4 className="h-sm ph" style={{ marginTop: "12px" }}>
                Name
              </h4>
              <p className="small ph">
                Designation · one-line credential
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="two">
            <div>
              <Led>Financial reports</Led>
              <ul>
                <li className="small ph" style={{ padding: "11px 0", borderBottom: "1px solid var(--rule)" }}>
                  Annual report — awaiting upload
                  {/* cms: report[annual] */}
                </li>
                <li className="small ph" style={{ padding: "11px 0", borderBottom: "1px solid var(--rule)" }}>
                  Audited financial statements — awaiting upload
                </li>
                <li className="small ph" style={{ padding: "11px 0", borderBottom: "1px solid var(--rule)" }}>
                  Project utilisation statements — awaiting upload
                </li>
                <li className="small ph" style={{ padding: "11px 0", borderBottom: "1px solid var(--rule)" }}>
                  Income tax filings — awaiting upload
                </li>
              </ul>
            </div>
            <div>
              <Led>Policies</Led>
              <ul>
                <li className="small ph" style={{ padding: "11px 0", borderBottom: "1px solid var(--rule)" }}>
                  Child safeguarding policy
                </li>
                <li className="small ph" style={{ padding: "11px 0", borderBottom: "1px solid var(--rule)" }}>
                  POSH policy
                </li>
                <li className="small ph" style={{ padding: "11px 0", borderBottom: "1px solid var(--rule)" }}>
                  Finance and procurement policy
                </li>
                <li className="small ph" style={{ padding: "11px 0", borderBottom: "1px solid var(--rule)" }}>
                  Conflict of interest policy
                </li>
                <li className="small ph" style={{ padding: "11px 0", borderBottom: "1px solid var(--rule)" }}>
                  Whistleblower policy
                </li>
                <li className="small ph" style={{ padding: "11px 0", borderBottom: "1px solid var(--rule)" }}>
                  Privacy notice and grievance redressal
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <div style={{ maxWidth: "66ch" }}>
            <Led>What we haven&apos;t proven</Led>
            <h2 className="h-lg">
              The page nobody else publishes.
            </h2>
            <p className="body" style={{ marginTop: "18px" }}>
              Claims we cannot yet support with evidence, and what would settle each one. This page is reviewed every quarter and items move off it only when the evidence exists, never because they became inconvenient.
            </p>
            <ul style={{ marginTop: "20px" }}>
              <li className="small ph" style={{ padding: "12px 0", borderBottom: "1px solid var(--rule)" }}>
                Claim · what evidence would settle it · when we expect to have it
                {/* cms: unproven[] */}
              </li>
              <li className="small ph" style={{ padding: "12px 0", borderBottom: "1px solid var(--rule)" }}>
                Claim · what evidence would settle it · when we expect to have it
              </li>
              <li className="small ph" style={{ padding: "12px 0", borderBottom: "1px solid var(--rule)" }}>
                Claim · what evidence would settle it · when we expect to have it
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
