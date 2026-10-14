import Link from "next/link";
import type { Metadata } from "next";
import { Badge, Button, Chip, Shot } from "@/components/ui/primitives";

// Ported verbatim from the Approved Design, page #p-pillar.
// Pass 1 (BUILD_GUIDE §0): static copy from the mockup; data comes in pass 2.

export const metadata: Metadata = { title: "Women's economic independence" };

// One seeded record until the content tables exist (pass 2).
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: "womens-economic-independence" }];
}

export default function PillarPage() {
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
            <Link href="/work">
              Our work
            </Link>
            {" "}
            / Women&apos;s economic independence
          </div>
          <Badge variant="on">
            Active
          </Badge>
          <h1 className="h-xl" style={{ maxWidth: "16ch", marginTop: "12px" }}>
            Women&apos;s economic independence
          </h1>
          <p className="lede" style={{ marginTop: "16px", maxWidth: "58ch" }}>
            Skill → Income → Ownership → Independence. Four stages, and most programmes stop after the first.
          </p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="two lean">
            <div className="artbody" style={{ maxWidth: "64ch" }}>
              <p>
                Training is the cheap part. A three-week tailoring course costs a few thousand rupees a head and produces a certificate. What it does not produce is income, because the distance between knowing a trade and earning from it is made of things a course does not touch: a machine, working capital, a first buyer, a bank account in her own name, and the confidence to walk into a branch.
              </p>
              <p>
                So we treat the whole chain as the programme, and we only count the end of it.
              </p>
              <h3>
                What we actually do
              </h3>
              <ul>
                <li>
                  Skills training in trades local employers and local markets are asking for
                </li>
                <li>
                  Enterprise setup support: costing, sourcing, pricing, registration
                </li>
                <li>
                  Financial literacy that ends in an account and a credit application, not a workshop
                </li>
                <li>
                  Self-help group formation and federation linkage where the block structure supports it
                </li>
                <li>
                  Market and buyer linkage, including institutional buyers
                </li>
                <li>
                  Digital access, because a woman who cannot use a phone cannot use a scheme portal
                </li>
              </ul>
              <h3>
                What we measure
              </h3>
              <ul>
                <li>
                  Enrolment, attendance and completion
                </li>
                <li>
                  Whether she is earning independently at six months and at twelve
                </li>
                <li>
                  How much that income changed, against a baseline taken at enrolment
                </li>
                <li>
                  Whether the bank account and any credit are in her name
                </li>
                <li>
                  Drop-out, and the reason, recorded honestly
                </li>
              </ul>
              <h3>
                What we don&apos;t claim
              </h3>
              <p>
                We do not claim to have changed household decision-making, or confidence, or status. Those things may well change. We have no instrument that measures them credibly at our scale, so we do not put them in a report.
              </p>
            </div>
            <aside>
              <Shot className="tall" style={{ minHeight: "300px" }}>
                <p>
                  Photograph — hands at work. A skill being performed. Faces optional.
                  {/* cms: pillar.image */}
                </p>
              </Shot>
              <div style={{ marginTop: "22px", border: "1px solid var(--rule)", padding: "20px" }}>
                <h4 className="h-sm">
                  Related schemes
                </h4>
                <p className="small" style={{ marginTop: "6px" }}>
                  Government support most relevant to this pillar, kept current on our schemes page.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "12px" }}>
                  <Chip href="/schemes">
                    Mudra Yojana
                  </Chip>
                  <Chip href="/schemes">
                    PMEGP
                  </Chip>
                  {" "}
                  <Chip href="/schemes">
                    CGTMSE
                  </Chip>
                  <Chip href="/schemes">
                    PM Vishwakarma
                  </Chip>
                </div>
              </div>
              <div style={{ marginTop: "16px", border: "1px solid var(--rule)", padding: "20px" }}>
                <h4 className="h-sm">
                  Projects in this pillar
                </h4>
                <p className="small ph" style={{ marginTop: "6px" }}>
                  Filled from the projects collection.
                  {/* cms: project.pillar = women */}
                </p>
                <Button ghost sm style={{ marginTop: "12px" }} href="/projects">
                  See projects
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
