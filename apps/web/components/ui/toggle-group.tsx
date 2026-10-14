"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

/*
 * Single-select toggle groups: `.filters`, `.askrow` chips and `.kbmode`.
 * Mirrors the mockup script: clicking a button presses it and releases the
 * others in the same group (aria-pressed).
 */

export type ToggleItem = string | { label: ReactNode; lang?: string };

type Props = {
  className: string;
  style?: CSSProperties;
  items: ToggleItem[];
  /** Index pressed on first render, as in the mockup. */
  defaultPressed?: number;
  /** Class on each button: "chip" for chip groups, none for `.kbmode`. */
  buttonClassName?: string;
  /** Accessible name for the group. */
  label?: string;
};

export function ToggleGroup({
  className,
  style,
  items,
  defaultPressed = 0,
  buttonClassName = "chip",
  label,
}: Props) {
  const [pressed, setPressed] = useState(defaultPressed);
  return (
    <div className={className} style={style} role="group" aria-label={label}>
      {items.map((item, i) => {
        const content = typeof item === "string" ? item : item.label;
        const lang = typeof item === "string" ? undefined : item.lang;
        return (
          <button
            key={i}
            type="button"
            className={buttonClassName || undefined}
            lang={lang}
            aria-pressed={pressed === i}
            onClick={() => setPressed(i)}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
