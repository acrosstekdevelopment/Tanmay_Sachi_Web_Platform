import Link from "next/link";
import type { Metadata } from "next";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/primitives";

// Ported verbatim from the Approved Design, page #p-knowledge.
// Pass 1 (BUILD_GUIDE §0): static copy from the mockup; data comes in pass 2.

export const metadata: Metadata = { title: "Knowledge base" };

export default function KnowledgePage() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">
              Home
            </Link>
            {" "}
            / Knowledge base
          </div>
          <div className="kbhero">
            <div>
              <h1 className="h-xl" style={{ maxWidth: "15ch" }}>
                Knowledge base
              </h1>
              <p className="lede" style={{ marginTop: "16px", maxWidth: "52ch" }}>
                Everything we know, written down. Practical guides for people who need to get something done, and research for people who need to understand why it&apos;s hard.
              </p>
            </div>
            <div className="askbox" style={{ borderRadius: "0" }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#5F656C" strokeWidth="1.7" strokeLinecap="round" style={{ flex: "none" }}>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.6-3.6" />
              </svg>
              {" "}
              <input aria-label="Search the knowledge base" placeholder="Search guides, research and field notes" />
            </div>
          </div>
          <ToggleGroup
            className="kbmode"
            buttonClassName=""
            label="What do you need?"
            items={[
              { label: <><h4>I need to do something</h4><p>Step-by-step guides. Forms, documents, what to say, what to bring.</p></> },
              { label: <><h4>I want to understand something</h4><p>Research, data and field notes. Sourced, dated, with our workings shown.</p></> },
            ]}
          />
        </div>
      </div>
      <section className="tight">
        <div className="wrap">
          <ToggleGroup className="filters" label="Filter by topic" items={["All topics", "Credit and finance", "Starting a business", "Digital skills", "Employment", "Health", "CSR and measurement", { label: "हिंदी", lang: "hi" }, "Under 10 min"]} />
          <div className="artlist">
            <Link className="art" href="/knowledge/writing-a-project-report-a-bank-will-accept">
              <div>
                <div className="kind">
                  Guide
                </div>
                <div className="small" style={{ marginTop: "4px" }}>
                  Credit and finance
                </div>
              </div>
              <div>
                <h3>
                  Writing a project report a bank will accept
                </h3>
                <p>
                  Most first applications are not rejected because the applicant is ineligible. They are rejected because the project report is thin. Here are the seven things a branch manager is actually looking for, with a template you can fill in.
                </p>
              </div>
              <div className="side">
                12 min read
                <br />
                Hindi and English
                <br />
                Updated Aug 2026
              </div>
            </Link>
            {" "}
            <Link className="art" href="/knowledge/writing-a-project-report-a-bank-will-accept">
              <div>
                <div className="kind">
                  Research
                </div>
                <div className="small" style={{ marginTop: "4px" }}>
                  Credit and finance
                </div>
              </div>
              <div>
                <h3>
                  Why collateral-free credit still doesn&apos;t reach rural women
                </h3>
                <p>
                  The schemes exist. The guarantee mechanism exists. The gap sits between the two, in branch-level discretion, documentation burden and the cost of a failed application. What the published data shows, and what it doesn&apos;t.
                </p>
              </div>
              <div className="side">
                18 min read
                <br />
                With sources
                <br />
                Updated Jul 2026
              </div>
            </Link>
            {" "}
            <Link className="art" href="/knowledge/writing-a-project-report-a-bank-will-accept">
              <div>
                <div className="kind">
                  Field note
                </div>
                <div className="small" style={{ marginTop: "4px" }}>
                  Digital skills
                </div>
              </div>
              <div>
                <h3>
                  What we got wrong in our first training cohort
                </h3>
                <p>
                  We designed a twelve-week course and scheduled it around our trainer&apos;s availability. Attendance collapsed in week five. What we learned about scheduling around harvest, childcare and the hours a shared phone is actually free.
                </p>
              </div>
              <div className="side">
                7 min read
                <br />
                From the field
                <br />
                Jun 2026
              </div>
            </Link>
            {" "}
            <Link className="art" href="/knowledge/writing-a-project-report-a-bank-will-accept">
              <div>
                <div className="kind">
                  Guide
                </div>
                <div className="small" style={{ marginTop: "4px" }}>
                  Starting a business
                </div>
              </div>
              <div>
                <h3>
                  Udyam registration, start to finish
                </h3>
                <p>
                  Free, online, takes about twenty minutes, and unlocks most of the schemes on our schemes page. Every field explained, including the three that people most often get wrong.
                </p>
              </div>
              <div className="side">
                9 min read
                <br />
                Hindi and English
                <br />
                Updated Aug 2026
              </div>
            </Link>
            {" "}
            <Link className="art" href="/knowledge/writing-a-project-report-a-bank-will-accept">
              <div>
                <div className="kind">
                  Method note
                </div>
                <div className="small" style={{ marginTop: "4px" }}>
                  CSR and measurement
                </div>
              </div>
              <div>
                <h3>
                  How we define &quot;placed&quot;, and why the definition matters
                </h3>
                <p>
                  Placement rates are the most gameable number in skilling. Here is our definition, the three things it excludes, and the follow-up window we use. Written so a CSR committee can audit it.
                </p>
              </div>
              <div className="side">
                11 min read
                <br />
                For partners
                <br />
                Updated May 2026
              </div>
            </Link>
            {" "}
            <Link className="art" href="/knowledge/writing-a-project-report-a-bank-will-accept">
              <div>
                <div className="kind">
                  Data note
                </div>
                <div className="small" style={{ marginTop: "4px" }}>
                  Employment
                </div>
              </div>
              <div>
                <h3>
                  Where the jobs actually are in our district
                </h3>
                <p>
                  We called 60 employers over six weeks and asked what they were hiring for. The answer did not match the courses being run locally. Small sample, honestly caveated, published anyway.
                </p>
              </div>
              <div className="side">
                6 min read
                <br />
                Small sample
                <br />
                Apr 2026
              </div>
            </Link>
          </div>
          <div style={{ marginTop: "34px", padding: "22px 24px", background: "var(--paper-alt)", borderLeft: "2px solid var(--coral)", maxWidth: "70ch" }}>
            <h4 className="h-sm">
              Nothing here answers your question?
            </h4>
            <p className="small" style={{ marginTop: "6px" }}>
              Every unanswered search is logged as a gap and reviewed monthly. It is how this library decides what to write next. You can also just ask us directly.
            </p>
            <Button sm style={{ marginTop: "14px" }} href="/contact">
              Ask a question
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
