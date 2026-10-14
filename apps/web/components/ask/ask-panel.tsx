"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/*
 * Home page Ask box (`.ask`). Phase 1 is illustrative only (Agreement cl. 4:
 * AI answers are Phase 2): asking reveals the static sample answer passed as
 * children, which keeps the "Illustrative response" note. Behaviour follows
 * the mockup's runAsk(): a chip fills the box, Find or a chip shows the answer.
 * `/?ask=<question>` (used by the Ask page chips) opens it pre-filled.
 */
const EXAMPLES: Array<{ label: string; q: string; lang?: string }> = [
  { label: "Start a business with no collateral", q: "I want to start a tailoring business but I have no collateral" },
  { label: "मुझे सिलाई का काम शुरू करना है", q: "मुझे सिलाई का काम शुरू करना है", lang: "hi" },
  { label: "Digital skills training near me", q: "Digital skills training near me" },
  { label: "CSR programmes in skilling", q: "CSR programmes in skilling" },
];

export function AskPanel({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  function show() {
    setShown(true);
    window.setTimeout(() => answerRef.current?.scrollIntoView({ block: "nearest" }), 40);
  }

  function ask(q?: string) {
    if (q) setQuery(q);
    show();
  }

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("ask");
    if (q === null) return;
    setQuery(q);
    setShown(true);
    window.setTimeout(() => answerRef.current?.scrollIntoView({ block: "nearest" }), 60);
  }, []);

  return (
    <div className="ask">
      <div className="ask-top">
        <h3>Tell us what you need. In your own words.</h3>
        <span className="small">Hindi or English · works by voice</span>
      </div>
      <div className="askbox">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F656C" strokeWidth="1.7" strokeLinecap="round" style={{ flex: "none" }} aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.6-3.6" />
        </svg>{" "}
        <input
          id="askq"
          aria-label="Tell us what you need"
          placeholder="e.g. I want to start a tailoring business but I have no collateral"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") ask();
          }}
        />{" "}
        <button type="button" className="mvoice" aria-label="Speak your question">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#C6321F" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            <rect x="9" y="2.5" width="6" height="11" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0M12 18v3.5" />
          </svg>
        </button>{" "}
        <button type="button" className="btn sm" onClick={() => ask()}>
          Find
        </button>
      </div>
      <div className="askrow">
        {EXAMPLES.map((ex) => (
          <button key={ex.q} type="button" className="chip" lang={ex.lang} onClick={() => ask(ex.q)}>
            {ex.label}
          </button>
        ))}
      </div>
      <div className={shown ? "answer on" : "answer"} id="answer" ref={answerRef} aria-live="polite">
        {children}
      </div>
    </div>
  );
}
