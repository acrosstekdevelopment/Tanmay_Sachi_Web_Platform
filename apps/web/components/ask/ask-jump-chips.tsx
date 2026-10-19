"use client";

import { useRouter } from "@/i18n/navigation";

// Ask page example chips: as in the mockup (runAsk(q, 1)), they go to the
// home page Ask box and show the illustrative answer for that question.
const EXAMPLES: Array<{ label: string; q: string; lang?: string }> = [
  { label: "Start a business", q: "I want to start a tailoring business but I have no collateral" },
  { label: "Training near me", q: "Digital skills training near me" },
  { label: "सिलाई का काम", q: "मुझे सिलाई का काम शुरू करना है", lang: "hi" },
  { label: "Health screening", q: "Health screening for women" },
];

export function AskJumpChips() {
  const router = useRouter();
  return (
    <div className="askrow">
      {EXAMPLES.map((ex) => (
        <button
          key={ex.q}
          type="button"
          className="chip"
          lang={ex.lang}
          onClick={() => router.push({ pathname: "/", query: { ask: ex.q } })}
        >
          {ex.label}
        </button>
      ))}
    </div>
  );
}
