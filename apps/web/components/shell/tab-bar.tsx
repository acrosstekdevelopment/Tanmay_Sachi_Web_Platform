"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

// `.tabbar` — mobile bottom navigation (5 tabs, centre "Ask" ring), below 820px.
// The mockup used buttons with data-go; links keep the same look and are
// real navigation. Active tab = exact route, as in the mockup.
export function TabBar() {
  const pathname = usePathname();
  const t = useTranslations("Shell");
  const cls = (href: string, extra = "") => ["tab", extra, pathname === href ? "on" : ""].filter(Boolean).join(" ");
  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <nav className="tabbar" aria-label={t("mainNav")}>
      <div className="tabs">
        <Link className={cls("/")} href="/" aria-current={current("/")}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5.5 9.5V20h13V9.5" />
          </svg>
          {t("tabs.home")}
        </Link>
        <Link className={cls("/schemes")} href="/schemes" aria-current={current("/schemes")}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3.5" y="4" width="17" height="16" rx="2" />
            <path d="M8 9h8M8 13h8M8 17h4" />
          </svg>
          {t("tabs.schemes")}
        </Link>
        <Link className={cls("/ask", "mid")} href="/ask" aria-current={current("/ask")}>
          <span className="ring">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.6-3.6" />
            </svg>
          </span>
          {t("tabs.ask")}
        </Link>
        <Link className={cls("/knowledge")} href="/knowledge" aria-current={current("/knowledge")}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 4.5h6a3 3 0 0 1 3 3V20a2.5 2.5 0 0 0-2.5-2.5H4Z" />
            <path d="M20 4.5h-6a3 3 0 0 0-3 3V20a2.5 2.5 0 0 1 2.5-2.5H20Z" />
          </svg>
          {t("tabs.learn")}
        </Link>
        <Link className={cls("/give")} href="/give" aria-current={current("/give")}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 6.5c2-3 8-2 8 2.5 0 4-5.5 7.5-8 9.5-2.5-2-8-5.5-8-9.5 0-4.5 6-5.5 8-2.5Z" />
          </svg>
          {t("tabs.give")}
        </Link>
      </div>
    </nav>
  );
}
