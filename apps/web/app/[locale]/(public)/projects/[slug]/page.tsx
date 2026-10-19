import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { Badge, Button, Sheet } from "@/components/ui/primitives";

// Ported verbatim from the Approved Design, page #p-project.
// Pass 1 (BUILD_GUIDE §0): static copy from the mockup; data comes in pass 2.

export const metadata: Metadata = { title: "Project" };

// One seeded record until the content tables exist (pass 2).
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: "featured" }];
}

export default function ProjectPage() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">
              Home
            </Link>
            {" "}
            /
            {" "}
            <Link href="/projects">
              Projects
            </Link>
            {" "}
            / Project
          </div>
          <Badge variant="on">
            Active
          </Badge>
          <h1 className="h-xl ph" style={{ maxWidth: "20ch", marginTop: "12px" }}>
            Project name
            {/* cms: project.name */}
          </h1>
          <p className="lede ph" style={{ marginTop: "14px" }}>
            One-line impact statement.
          </p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <Sheet>
            <dl className="meta" style={{ borderTop: "0", paddingTop: "0", marginTop: "0" }}>
              <div>
                <dt>
                  State
                </dt>
                <dd className="ph">
                  ——
                </dd>
              </div>
              <div>
                <dt>
                  District
                </dt>
                <dd className="ph">
                  ——
                </dd>
              </div>
              <div>
                <dt>
                  Community
                </dt>
                <dd className="ph">
                  ——
                </dd>
              </div>
              <div>
                <dt>
                  Participants
                </dt>
                <dd className="ph">
                  ——
                </dd>
              </div>
              <div>
                <dt>
                  Started
                </dt>
                <dd className="ph">
                  ——
                </dd>
              </div>
              <div>
                <dt>
                  Delivery partner
                </dt>
                <dd className="ph">
                  ——
                </dd>
              </div>
            </dl>
            <div className="two" style={{ marginTop: "32px" }}>
              <div>
                <h4 className="h-sm">
                  The problem
                </h4>
                <p className="body ph" style={{ marginTop: "7px" }}>
                  80 to 120 words, specific to this place, with a source for any statistic quoted.
                  {/* cms: project.problem_statement */}
                </p>
                <h4 className="h-sm" style={{ marginTop: "24px" }}>
                  What we will do
                </h4>
                <p className="body ph" style={{ marginTop: "7px" }}>
                  The intervention, stepwise, in plain language.
                </p>
                <h4 className="h-sm" style={{ marginTop: "24px" }}>
                  Objectives
                </h4>
                <p className="small" style={{ marginTop: "7px" }}>
                  Locked at publication. Additions are dated and versioned; nothing is silently edited.
                  {/* cms: 🔒 locked_at_publish */}
                </p>
                <h4 className="h-sm" style={{ marginTop: "24px" }}>
                  What we will measure
                </h4>
                <ul className="small" style={{ marginTop: "7px", listStyle: "disc", paddingLeft: "18px" }}>
                  <li>
                    Enrolment, attendance, completion
                  </li>
                  <li>
                    Certification
                  </li>
                  <li>
                    Placement or self-employment
                  </li>
                  <li>
                    Income change at six and twelve months
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="h-sm">
                  Funding
                </h4>
                <div className="bar">
                  <i />
                </div>
                <p className="small">
                  <span className="ph">
                    ₹——
                  </span>
                  {" "}
                  raised ·
                  {" "}
                  <span className="ph">
                    ₹——
                  </span>
                  {" "}
                  required · gap
                  {" "}
                  <span className="ph">
                    ₹——
                  </span>
                </p>
                <table className="ledger" style={{ marginTop: "22px" }}>
                  <thead>
                    <tr>
                      <th>
                        Cost line
                      </th>
                      <th>
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="ph">
                        Trainer fees
                      </td>
                      <td className="ph">
                        ₹——
                      </td>
                    </tr>
                    <tr>
                      <td className="ph">
                        Devices and connectivity
                      </td>
                      <td className="ph">
                        ₹——
                      </td>
                    </tr>
                    <tr>
                      <td className="ph">
                        Materials, per participant
                      </td>
                      <td className="ph">
                        ₹——
                      </td>
                    </tr>
                    <tr>
                      <td className="ph">
                        Venue and logistics
                      </td>
                      <td className="ph">
                        ₹——
                      </td>
                    </tr>
                    <tr>
                      <td className="ph">
                        Monitoring and follow-up
                      </td>
                      <td className="ph">
                        ₹——
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Total
                      </td>
                      <td className="ph">
                        ₹——
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h4 className="h-sm" style={{ marginTop: "26px" }}>
                  What your contribution funds
                </h4>
                <ul className="tiers" style={{ marginTop: "9px" }}>
                  <li>
                    <b>
                      ₹500
                    </b>
                    <span className="ph">
                      from cost line 3
                    </span>
                  </li>
                  <li>
                    <b>
                      ₹2,500
                    </b>
                    <span className="ph">
                      from cost line 2
                    </span>
                  </li>
                  <li>
                    <b>
                      ₹10,000
                    </b>
                    <span className="ph">
                      from cost line 1
                    </span>
                  </li>
                </ul>
                <p className="small" style={{ marginTop: "10px" }}>
                  Tiers are generated from the budget above. They cannot be typed by hand, which is how we know they are true.
                  {/* cms: giving_tiers ← cost_breakdown */}
                </p>
                <div className="cta">
                  <Button href="/give">
                    Fund this project
                  </Button>
                  <Button ghost href="/partner">
                    CSR partnership
                  </Button>
                </div>
              </div>
            </div>
            <div className="unknown">
              <h4 className="h-sm">
                What we don&apos;t know yet
              </h4>
              <p className="body ph" style={{ marginTop: "6px" }}>
                One honest paragraph: what this intervention has not yet demonstrated, and what evidence would settle it.
                {/* cms: project.what_we_dont_know_yet */}
              </p>
            </div>
          </Sheet>
        </div>
      </section>
    </>
  );
}
