import Link from "next/link";
import type { Metadata } from "next";
import { Badge, Led, Shot } from "@/components/ui/primitives";

// Ported verbatim from the Approved Design, page #p-work.
// Pass 1 (BUILD_GUIDE §0): static copy from the mockup; data comes in pass 2.

export const metadata: Metadata = { title: "Our work" };

export default function WorkPage() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">
              Home
            </Link>
            {" "}
            / Our work
          </div>
          <h1 className="h-xl" style={{ maxWidth: "16ch" }}>
            Access, capability, independence.
          </h1>
          <p className="lede" style={{ marginTop: "18px", maxWidth: "60ch" }}>
            Four pillars and one route through all of them. Technology is not a fifth pillar; it is the layer underneath the other four, which is what lets us tell you what happened rather than what we intended.
          </p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="rowlist">
            <Link className="row" href="/work/womens-economic-independence">
              <h3>
                Women&apos;s economic independence
                <div className="spine">
                  Skill → Income → Ownership → Independence
                </div>
              </h3>
              <div>
                <p>
                  Skills, micro-enterprise support, financial literacy, self-help group enablement, and the credit and market links that turn a trade into an income. Our founding focus and the pillar the organisation is named for.
                </p>
                <p className="small" style={{ marginTop: "8px" }}>
                  Measured by: women earning independent income, and by how much that income changed.
                </p>
              </div>
              <div>
                <Badge variant="on">
                  Active
                </Badge>
              </div>
            </Link>
            {" "}
            <Link className="row" href="/work/womens-economic-independence">
              <h3>
                Learning &amp; digital access
                <div className="spine">
                  Access → Learn → Capability → Opportunity
                </div>
              </h3>
              <div>
                <p>
                  Digital and AI literacy, learning support, career guidance, and the classroom infrastructure that makes any of it possible. A course nobody can reach is not access.
                </p>
                <p className="small" style={{ marginTop: "8px" }}>
                  Measured by: learners completing, and what completion opened up.
                </p>
              </div>
              <div>
                <Badge variant="on">
                  Active
                </Badge>
              </div>
            </Link>
            {" "}
            <Link className="row" href="/work/womens-economic-independence">
              <h3>
                Skills to livelihood
                <div className="spine">
                  Train → Certify → Place → Progress
                </div>
              </h3>
              <div>
                <p>
                  Vocational and technology skilling, employability, entrepreneurship support and direct linkage to employers who are actually hiring. We start from what local employers say they need, not from what is easy to teach.
                </p>
                <p className="small" style={{ marginTop: "8px" }}>
                  Measured by: people placed or self-employed, and income change at six and twelve months.
                </p>
              </div>
              <div>
                <Badge variant="des">
                  In design
                </Badge>
              </div>
            </Link>
            {" "}
            <Link className="row" href="/work/womens-economic-independence">
              <h3>
                Health access
                <div className="spine">
                  Awareness → Screening → Intervention → Referral → Follow-up
                </div>
              </h3>
              <div>
                <p>
                  Preventive and women&apos;s health, screening, nutrition and the follow-up that most camps never do. A camp is an output. A completed referral is an outcome.
                </p>
                <p className="small" style={{ marginTop: "8px" }}>
                  Measured by: referral pathways completed, not camps held.
                </p>
              </div>
              <div>
                <Badge variant="pl">
                  Planned
                </Badge>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <Led>The layer underneath</Led>
          <div className="two">
            <div>
              <p className="pull">
                We don&apos;t run programmes and then measure them. The measurement is how the programme runs.
              </p>
              <p className="body" style={{ marginTop: "20px" }}>
                Registration, attendance, assessment, referral and follow-up all happen in one system. A partner&apos;s quarterly report is not assembled from memory at the end of a quarter. It is the same data the field team used that morning.
              </p>
              <p className="body" style={{ marginTop: "14px" }}>
                This is also what makes honesty affordable. When measurement is a separate exercise done at the end, there is always a reason to round up. When it is the operating system, the number is whatever it is.
              </p>
            </div>
            <Shot className="wide">
              <p>
                Detail photograph — a register or tablet in use in the field. Hands, not faces.
                {/* cms: work.tech_image */}
              </p>
            </Shot>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <Led>How we work</Led>
          <ol className="method">
            <li className="step">
              <div className="n">
                1
              </div>
              <h4>
                Listen
              </h4>
              <p>
                Time in the community before any design. What people say they need is rarely what a proposal assumes.
              </p>
            </li>
            <li className="step">
              <div className="n">
                2
              </div>
              <h4>
                Design
              </h4>
              <p>
                A costed intervention with objectives written down and locked before the first rupee is spent.
              </p>
            </li>
            <li className="step">
              <div className="n">
                3
              </div>
              <h4>
                Deliver
              </h4>
              <p>
                Implementation with named local partners who stay after we leave.
              </p>
            </li>
            <li className="step">
              <div className="n">
                4
              </div>
              <h4>
                Measure
              </h4>
              <p>
                Participation and outcomes tracked as the work happens.
              </p>
            </li>
            <li className="step">
              <div className="n">
                5
              </div>
              <h4>
                Improve
              </h4>
              <p>
                Evidence changes the next cohort. What doesn&apos;t work gets published too.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
