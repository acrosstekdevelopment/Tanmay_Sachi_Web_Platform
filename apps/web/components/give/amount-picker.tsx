"use client";

import { useState } from "react";

/*
 * Give page amount tiers (`.amounts`) and the "Funds …" line (#what2).
 * Selecting an amount updates the line, as in the mockup. The tier copy is the
 * mockup's illustrative text; in pass 2 each tier derives from a project cost
 * line (`giving_tiers ← cost_breakdown`, commitment 3) and is never typed here.
 */
export type GivingTier = { label: string; funds: string };

const MOCKUP_TIERS: GivingTier[] = [
  { label: "₹500", funds: "training materials for one participant" },
  { label: "₹1,000", funds: "a month of connectivity for a learning centre" },
  { label: "₹2,500", funds: "digital skills training support for one woman" },
  { label: "₹5,000", funds: "a week of trainer time" },
  { label: "₹10,000", funds: "a full training batch of twelve" },
  { label: "Other", funds: "an amount you choose" },
];

export function AmountPicker({ tiers = MOCKUP_TIERS, defaultIndex = 2 }: { tiers?: GivingTier[]; defaultIndex?: number }) {
  const [selected, setSelected] = useState(defaultIndex);
  const current = tiers[selected];
  return (
    <>
      <div className="amounts" role="group" aria-label="How much?">
        {tiers.map((t, i) => (
          <button key={t.label} type="button" className="amt" aria-pressed={selected === i} onClick={() => setSelected(i)}>
            {t.label}
          </button>
        ))}
      </div>
      <p className="small" id="what2" style={{ marginTop: "12px" }} aria-live="polite">
        Funds <b className="ph">{current?.funds}</b>
        {/* cms: from project.giving_tiers */}
      </p>
    </>
  );
}
