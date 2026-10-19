import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { AskJumpChips } from "@/components/ask/ask-jump-chips";
import { Button } from "@/components/ui/primitives";

// Ported verbatim from the Approved Design, page #p-search.
// Pass 1 (BUILD_GUIDE §0): static copy from the mockup; data comes in pass 2.

export const metadata: Metadata = { title: "Ask" };

export default function AskPage() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <h1 className="h-xl" style={{ maxWidth: "14ch" }}>
            What do you need?
          </h1>
          <p className="lede" style={{ marginTop: "14px" }}>
            Ask in Hindi or English. Type it, or hold the microphone and say it.
          </p>
        </div>
      </div>
      <section className="tight">
        <div className="wrap">
          <div className="askbox">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#5F656C" strokeWidth="1.7" strokeLinecap="round" style={{ flex: "none" }}>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.6-3.6" />
            </svg>
            {" "}
            <input id="askq2" aria-label="What do you need?" placeholder="e.g. I want to start a tailoring business" />
            {" "}
            <button className="mvoice" aria-label="Speak">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C6321F" strokeWidth="1.7" strokeLinecap="round">
                <rect x="9" y="2.5" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3.5" />
              </svg>
            </button>
          </div>
          <AskJumpChips />
          <div style={{ marginTop: "26px" }}>
            <h4 className="h-sm">
              People near you are asking
            </h4>
            <Link className="mtile" style={{ marginTop: "12px" }} href="/schemes">
              <span className="ic">
                ?
              </span>
              <div>
                <h4>
                  Can I get a loan without any property?
                </h4>
                <p>
                  3 schemes · 1 guide
                </p>
              </div>
            </Link>
            {" "}
            <Link className="mtile" href="/knowledge">
              <span className="ic">
                ?
              </span>
              <div>
                <h4>
                  How do I do Udyam registration?
                </h4>
                <p>
                  Step-by-step guide · 9 min
                </p>
              </div>
            </Link>
            {" "}
            <Link className="mtile" href="/schemes">
              <span className="ic">
                ?
              </span>
              <div>
                <h4>
                  What has changed in Stand-Up India?
                </h4>
                <p>
                  Updated 28 August
                </p>
              </div>
            </Link>
          </div>
          <div className="escalate" style={{ marginTop: "24px" }}>
            <div style={{ flex: "1", minWidth: "200px" }}>
              <strong style={{ fontSize: "15.5px" }}>
                Prefer to talk to a person?
              </strong>
              <p className="small" style={{ marginTop: "3px" }}>
                Leave a number and someone will call you back.
              </p>
            </div>
            <Button sm href="/contact">
              Request a callback
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
