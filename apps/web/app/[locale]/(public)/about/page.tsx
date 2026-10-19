import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { Led, Shot } from "@/components/ui/primitives";

// Ported verbatim from the Approved Design, page #p-about.
// Pass 1 (BUILD_GUIDE §0): static copy from the mockup; data comes in pass 2.

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">
              Home
            </Link>
            {" "}
            / About
          </div>
          <h1 className="h-xl" style={{ maxWidth: "18ch" }}>
            Most organisations are named after what they do.
          </h1>
          <p className="lede" style={{ marginTop: "18px", maxWidth: "56ch" }}>
            This one is named after a person.
            {/* cms: confirm the actual origin of the name before publishing */}
          </p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="two lean">
            <div className="artbody" style={{ maxWidth: "62ch" }}>
              <p className="ph">
                Our story, roughly 300 words. Written once the origin of the name is confirmed. It should say what happened, who decided, and why, rather than describing values.
                {/* cms: about.story */}
              </p>
              <p className="body">
                The theme is not complicated: opportunity received creates an obligation. When education, technology, healthcare or a professional break changes one person&apos;s life, that opportunity can be passed forward. That is the whole of it, and it does not need three paragraphs of framing.
              </p>
            </div>
            <Shot className="tall" style={{ minHeight: "320px" }}>
              <p>
                Founding photograph — the team in the field, not in a boardroom.
                {/* cms: about.image */}
              </p>
            </Shot>
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <Led>What we believe</Led>
          {/* Mockup: style="grid-template-columns:repeat(5,1fr)". Moved to `.four.five` so the
              mobile single-column rule applies (the inline style overflowed at 390px). */}
          <div className="four five">
            <div>
              <h4 className="h-md">
                Faith in people
              </h4>
              <p className="small" style={{ marginTop: "8px" }}>
                Potential is distributed evenly. Opportunity is not.
              </p>
            </div>
            <div>
              <h4 className="h-md">
                Dignity before charity
              </h4>
              <p className="small" style={{ marginTop: "8px" }}>
                We work with capable people who lack access, not with people who need saving.
              </p>
            </div>
            <div>
              <h4 className="h-md">
                Trust through accountability
              </h4>
              <p className="small" style={{ marginTop: "8px" }}>
                We publish what we do, what it costs, and what it didn&apos;t achieve.
              </p>
            </div>
            <div>
              <h4 className="h-md">
                Gratitude into action
              </h4>
              <p className="small" style={{ marginTop: "8px" }}>
                Opportunity received creates an obligation to pass it on.
              </p>
            </div>
            <div>
              <h4 className="h-md">
                Progress through partnership
              </h4>
              <p className="small" style={{ marginTop: "8px" }}>
                Nothing durable is built by one organisation alone.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <Led>Team</Led>
          <div className="four">
            <div>
              <Shot style={{ minHeight: "150px" }}>
                <p>
                  Portrait
                </p>
              </Shot>
              <h4 className="h-sm ph" style={{ marginTop: "12px" }}>
                Name
              </h4>
              <p className="small ph">
                Role
              </p>
            </div>
            <div>
              <Shot style={{ minHeight: "150px" }}>
                <p>
                  Portrait
                </p>
              </Shot>
              <h4 className="h-sm ph" style={{ marginTop: "12px" }}>
                Name
              </h4>
              <p className="small ph">
                Role
              </p>
            </div>
            <div>
              <Shot style={{ minHeight: "150px" }}>
                <p>
                  Portrait
                </p>
              </Shot>
              <h4 className="h-sm ph" style={{ marginTop: "12px" }}>
                Name
              </h4>
              <p className="small ph">
                Role
              </p>
            </div>
            <div>
              <Shot style={{ minHeight: "150px" }}>
                <p>
                  Portrait
                </p>
              </Shot>
              <h4 className="h-sm ph" style={{ marginTop: "12px" }}>
                Name
              </h4>
              <p className="small ph">
                Role
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
