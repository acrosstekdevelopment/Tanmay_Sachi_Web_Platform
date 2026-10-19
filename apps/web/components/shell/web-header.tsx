"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/primitives";
import { Brand } from "@/components/ui/logo";
import { LangSwitch } from "./lang-switch";

// `.webhead` — desktop sticky header (≥820px). Active link = current route,
// matching the mockup's `data-nav` + `.on` behaviour (top-level pages only).
const NAV = [
  { href: "/work", key: "work" },
  { href: "/projects", key: "projects" },
  { href: "/schemes", key: "schemes" },
  { href: "/knowledge", key: "knowledge" },
  { href: "/partner", key: "partner" },
  { href: "/accountability", key: "accountability" },
  { href: "/about", key: "about" },
] as const;

export function WebHeader() {
  const pathname = usePathname();
  const t = useTranslations("Shell");
  return (
    <header className="webhead">
      <div className="wrap hbar">
        <Link className="brand" href="/">
          <Brand size={36} />
        </Link>
        <nav className="webnav" aria-label={t("mainNav")}>
          {NAV.map((item) => {
            const on = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={on ? "on" : undefined}
                aria-current={on ? "page" : undefined}
              >
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}{" "}
          <LangSwitch />{" "}
          <Button sm href="/give">
            {t("donate")}
          </Button>
        </nav>
      </div>
    </header>
  );
}
