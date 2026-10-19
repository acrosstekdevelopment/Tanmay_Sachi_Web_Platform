import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { Button, Led, TextLink } from "@/components/ui/primitives";

// Ported verbatim from the Approved Design, page #p-partner.
// Pass 1 (BUILD_GUIDE §0): static copy from the mockup; data comes in pass 2.

export const metadata: Metadata = { title: "Partner with us" };

export default function PartnerPage() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">
              Home
            </Link>
            {" "}
            / Partner with us
          </div>
          <h1 className="h-xl" style={{ maxWidth: "20ch" }}>
            Turn commitments into outcomes you can audit.
          </h1>
          <p className="lede" style={{ marginTop: "18px", maxWidth: "58ch" }}>
            Three routes in, each with a different first conversation. All three end in the same place: a costed programme with objectives written down before it starts.
          </p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <Led>Corporate and CSR</Led>
          <div className="two lean">
            <div>
              <h2 className="h-lg" style={{ maxWidth: "22ch" }}>
                Where we stand on CSR eligibility
              </h2>
              <p className="body" style={{ marginTop: "16px" }}>
                Under Rule 4 of the Companies (CSR Policy) Rules, an implementing agency must hold 12A and 80G registration, be registered with the MCA through Form CSR-1, and demonstrate a track record of at least three years in similar activities. Companies are expected to verify this with documents, not accept a claim.
              </p>
              <p className="body" style={{ marginTop: "14px" }}>
                Our current position is published below and updates the moment a registration changes. If any line reads &quot;pending&quot;, it is pending.
              </p>
              <dl className="four" style={{ gridTemplateColumns: "1fr 1fr", marginTop: "20px" }}>
                <div>
                  <dt className="small">
                    12A
                  </dt>
                  <dd className="h-sm ph">
                    ——
                    {/* cms: credential[12ab].status */}
                  </dd>
                </div>
                <div>
                  <dt className="small">
                    80G
                  </dt>
                  <dd className="h-sm ph">
                    ——
                  </dd>
                </div>
                <div>
                  <dt className="small">
                    CSR-1
                  </dt>
                  <dd className="h-sm ph">
                    ——
                  </dd>
                </div>
                <div>
                  <dt className="small">
                    Track record
                  </dt>
                  <dd className="h-sm ph">
                    year — of 3
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <h4 className="h-sm">
                What we do for corporate partners
              </h4>
              <ul style={{ marginTop: "12px" }}>
                <li className="small" style={{ padding: "9px 0", borderBottom: "1px solid var(--rule)" }}>
                  Programme design, from community consultation to costed proposal
                </li>
                <li className="small" style={{ padding: "9px 0", borderBottom: "1px solid var(--rule)" }}>
                  Implementation with named local delivery partners
                </li>
                <li className="small" style={{ padding: "9px 0", borderBottom: "1px solid var(--rule)" }}>
                  Monitoring and evaluation built into delivery, not bolted on
                </li>
                <li className="small" style={{ padding: "9px 0", borderBottom: "1px solid var(--rule)" }}>
                  Quarterly reporting in the format a CSR committee accepts
                </li>
                <li className="small" style={{ padding: "9px 0", borderBottom: "1px solid var(--rule)" }}>
                  Employee volunteering, designed and managed
                </li>
                <li className="small" style={{ padding: "9px 0", borderBottom: "1px solid var(--rule)" }}>
                  Multi-location delivery where we have district presence
                </li>
              </ul>
              <Button style={{ marginTop: "20px" }} href="/contact">
                Discuss a CSR partnership
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <Led>Partnership models</Led>
          <div className="three">
            <div>
              <h3 className="h-md">
                Sponsor a programme
              </h3>
              <p className="small" style={{ marginTop: "8px" }}>
                Fund an existing, costed programme. Fastest route, reporting from day one.
              </p>
            </div>
            <div>
              <h3 className="h-md">
                Co-create a programme
              </h3>
              <p className="small" style={{ marginTop: "8px" }}>
                Design jointly around your thematic priority and geography, then pilot before scaling.
              </p>
            </div>
            <div>
              <h3 className="h-md">
                Adopt a community
              </h3>
              <p className="small" style={{ marginTop: "8px" }}>
                Multi-year commitment to one location across more than one pillar.
              </p>
            </div>
          </div>
          <div className="three" style={{ marginTop: "2px" }}>
            <div>
              <h3 className="h-md">
                Employee volunteering
              </h3>
              <p className="small" style={{ marginTop: "8px" }}>
                Structured, skill-matched and measured. Costs nothing from the CSR budget.
              </p>
            </div>
            <div>
              <h3 className="h-md">
                In-kind contribution
              </h3>
              <p className="small" style={{ marginTop: "8px" }}>
                Devices, connectivity, content, licences, venue. Often the fastest thing to approve.
              </p>
            </div>
            <div>
              <h3 className="h-md">
                Founding partner
              </h3>
              <p className="small" style={{ marginTop: "8px" }}>
                Named permanently in every annual report, a seat in programme design, first five partners only.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <Led>Government and institutions</Led>
          <div className="two lean">
            <div>
              <h2 className="h-lg" style={{ maxWidth: "22ch" }}>
                An implementation partner that documents itself.
              </h2>
              <p className="body" style={{ marginTop: "16px" }}>
                For departments, missions, PSUs and district administrations. We work as a delivery and technology partner across education, skills, digital literacy, health, women&apos;s empowerment and community development.
              </p>
              <Button style={{ marginTop: "20px" }} href="/contact">
                Explore institutional partnership
              </Button>
              <p className="small" style={{ marginTop: "12px" }}>
                <TextLink href="#">
                  Download the one-page organisational profile (PDF)
                </TextLink>
              </p>
            </div>
            <div>
              <table className="ledger">
                <tbody>
                  <tr>
                    <td>
                      Legal status
                    </td>
                    <td>
                      Section 8 non-profit
                    </td>
                  </tr>
                  <tr>
                    <td>
                      CIN
                    </td>
                    <td className="ph">
                      ——
                    </td>
                  </tr>
                  <tr>
                    <td>
                      NGO Darpan
                    </td>
                    <td className="ph">
                      ——
                    </td>
                  </tr>
                  <tr>
                    <td>
                      States of operation
                    </td>
                    <td className="ph">
                      ——
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Districts
                    </td>
                    <td className="ph">
                      ——
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Named contact
                    </td>
                    <td className="ph">
                      ——
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <Led>Give more than money</Led>
          <h2 className="h-lg" style={{ maxWidth: "24ch", marginBottom: "26px" }}>
            Most of what we need isn&apos;t funding.
          </h2>
          <div className="four">
            <div>
              <h4 className="h-sm">
                Donate time
              </h4>
              <p className="small" style={{ marginTop: "5px" }}>
                Teach a module, mentor a cohort, help at a field day.
              </p>
            </div>
            <div>
              <h4 className="h-sm">
                Donate skills
              </h4>
              <p className="small" style={{ marginTop: "5px" }}>
                Accounting, legal, design, data, translation, curriculum.
              </p>
            </div>
            <div>
              <h4 className="h-sm">
                Donate technology
              </h4>
              <p className="small" style={{ marginTop: "5px" }}>
                Devices, connectivity, software licences, cloud credit.
              </p>
            </div>
            <div>
              <h4 className="h-sm">
                Donate equipment
              </h4>
              <p className="small" style={{ marginTop: "5px" }}>
                Machines, tools, furniture for a training room.
              </p>
            </div>
            <div>
              <h4 className="h-sm">
                Provide employment
              </h4>
              <p className="small" style={{ marginTop: "5px" }}>
                Interview our cohorts. This is the single most useful thing an employer can do.
              </p>
            </div>
            <div>
              <h4 className="h-sm">
                Mentor someone
              </h4>
              <p className="small" style={{ marginTop: "5px" }}>
                An hour a month with one entrepreneur, for six months.
              </p>
            </div>
            <div>
              <h4 className="h-sm">
                Sponsor a training batch
              </h4>
              <p className="small" style={{ marginTop: "5px" }}>
                One batch, fully costed, with the results sent to you.
              </p>
            </div>
            <div>
              <h4 className="h-sm">
                Fundraise
              </h4>
              <p className="small" style={{ marginTop: "5px" }}>
                Birthday, festival or workplace giving, with a project page of your own.
              </p>
            </div>
          </div>
          <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <Button href="/contact">
              Find a role
            </Button>
            {" "}
            <span className="small">
              We reply to every enquiry within five working days.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
