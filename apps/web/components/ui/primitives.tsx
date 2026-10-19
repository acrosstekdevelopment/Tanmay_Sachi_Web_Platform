import { Link } from "@/i18n/navigation";
import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";

/*
 * UI primitives from the Approved Design (BUILD_GUIDE §2, builder step 1.2).
 * Each renders exactly the mockup's element and class names; styling lives in
 * app/globals.css, ported verbatim from the mockup. Do not restyle here.
 */

type Base = { className?: string; style?: CSSProperties; children?: ReactNode };

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Internal routes use the locale-aware Link (stays in /en or /hi); "#" and in-page anchors stay plain <a>. */
export function SmartLink({ href, ...rest }: ComponentPropsWithoutRef<"a"> & { href: string }) {
  if (href.startsWith("/")) return <Link href={href} {...rest} />;
  return <a href={href} {...rest} />;
}

type ButtonProps = Base & {
  href?: string;
  ghost?: boolean;
  sm?: boolean;
  full?: boolean;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "style" | "children">;

/** `.btn` — solid ink; hover coral. Variants: ghost, sm, full. */
export function Button({ href, ghost, sm, full, className, style, children, ...rest }: ButtonProps) {
  const cls = cx("btn", ghost && "ghost", sm && "sm", full && "full", className);
  if (href !== undefined) {
    return (
      <SmartLink href={href} className={cls} style={style}>
        {children}
      </SmartLink>
    );
  }
  return (
    <button type="button" className={cls} style={style} {...rest}>
      {children}
    </button>
  );
}

/** `.tlink` — coral underlined text link. */
export function TextLink({ href, className, style, children }: Base & { href: string }) {
  return (
    <SmartLink href={href} className={cx("tlink", className)} style={style}>
      {children}
    </SmartLink>
  );
}

/** `.chip` — a link chip, or a static button chip (toggle groups use ChipGroup). */
export function Chip({
  href,
  pressed,
  lang,
  className,
  style,
  children,
}: Base & { href?: string; pressed?: boolean; lang?: string }) {
  if (href !== undefined) {
    return (
      <SmartLink href={href} className={cx("chip", className)} style={style} lang={lang}>
        {children}
      </SmartLink>
    );
  }
  return (
    <button
      type="button"
      className={cx("chip", className)}
      style={style}
      lang={lang}
      aria-pressed={pressed === undefined ? undefined : pressed}
    >
      {children}
    </button>
  );
}

export type BadgeVariant = "open" | "soon" | "chg" | "shut" | "on" | "des" | "pl";

/** `.badge` — status pill. Scheme status maps Open→open, Soon→soon, Changed→chg, Shut→shut. */
export function Badge({ variant, className, style, children }: Base & { variant: BadgeVariant }) {
  return (
    <span className={cx("badge", variant, className)} style={style}>
      {children}
    </span>
  );
}

/** `.src` — provenance line, optionally led by the green `.dot`. */
export function Source({ dot, className, style, children }: Base & { dot?: boolean }) {
  return (
    <span className={cx("src", className)} style={style}>
      {dot && <span className="dot" />}
      {children}
    </span>
  );
}

/** `.led` — labelled hairline section divider. */
export function Led({ children }: { children: ReactNode }) {
  return (
    <div className="led">
      <span>{children}</span>
      <i />
    </div>
  );
}

/** `.plane` — the hero's folded-paper container with the coral `.fold`. */
export function Plane({ className, style, children }: Base) {
  return (
    <div className={cx("plane", className)} style={style}>
      <div className="fold" />
      {children}
    </div>
  );
}

/** `.sheet` — the project sheet: same fold at 60px. */
export function Sheet({ className, style, children }: Base) {
  return (
    <div className={cx("sheet", className)} style={style}>
      <div className="fold" />
      {children}
    </div>
  );
}

/**
 * `.shot` — image slot. Until the media library exists it shows the art
 * direction note from the Approved Design, exactly as the mockup does.
 */
export function Shot({ className, style, children }: Base) {
  return (
    <figure className={cx("shot", className)} style={style}>
      {children}
    </figure>
  );
}
