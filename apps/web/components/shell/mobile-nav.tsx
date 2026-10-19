"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, type FormEvent, type MouseEvent } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Button, Chip } from "@/components/ui/primitives";
import { Brand } from "@/components/ui/logo";
import { LangSwitch } from "./lang-switch";

// `.mhead` (mobile top bar, search, chip strip) and `.drawer` (menu), below 820px.
// Behaviour from the mockup script: burger opens; Close, scrim tap and link
// tap close; the search form goes to the Ask page.
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Shell");

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function goAsk(e: FormEvent) {
    e.preventDefault();
    router.push("/ask");
  }

  function onDrawerClick(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (target === e.currentTarget || target.closest("a")) setOpen(false);
  }

  return (
    <>
      <div className="mhead">
        <div className="mtop">
          <Link className="brand" href="/">
            <Brand size={28} />
          </Link>{" "}
          <LangSwitch short />{" "}
          <button
            className="mburger"
            id="burger"
            aria-label={t("mobile.openMenu")}
            aria-expanded={open}
            aria-controls="drawer"
            onClick={() => setOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16181A" strokeWidth="1.7" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
        <div className="msearch">
          <form onSubmit={goAsk} role="search">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5F656C" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.6-3.6" />
            </svg>{" "}
            <input id="mq" placeholder={t("mobile.searchPlaceholder")} aria-label={t("mobile.searchLabel")} />{" "}
            <button type="button" className="mvoice" aria-label={t("mobile.voice")}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C6321F" strokeWidth="1.7" strokeLinecap="round">
                <rect x="9" y="2.5" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3.5" />
              </svg>
            </button>
          </form>
        </div>
        <div className="mstrip">
          <Chip href="/schemes">{t("mobile.chipSchemesForWomen")}</Chip>{" "}
          <Chip href="/schemes">{t("mobile.chipLoans")}</Chip>{" "}
          <Chip href="/knowledge">{t("mobile.chipHowToApply")}</Chip>{" "}
          <Chip href="/projects">{t("mobile.chipTrainingNearMe")}</Chip>
        </div>
      </div>

      <div className={open ? "drawer open" : "drawer"} id="drawer" onClick={onDrawerClick}>
        <div className="drawer-in" role="dialog" aria-modal="true" aria-label={t("mobile.menu")}>
          <Button ghost sm id="drawerClose" style={{ float: "right" }} onClick={() => setOpen(false)}>
            {t("mobile.close")}
          </Button>
          <h4>{t("drawer.ourWork")}</h4>
          <Link href="/work">{t("drawer.allPillars")}</Link>{" "}
          <Link href="/work/womens-economic-independence">{t("drawer.womensIndependence")}</Link>{" "}
          <Link href="/projects">{t("drawer.projects")}</Link>
          <h4>{t("drawer.findHelp")}</h4>
          <Link href="/schemes">{t("drawer.schemes")}</Link>{" "}
          <Link href="/knowledge">{t("drawer.knowledge")}</Link>{" "}
          <Link href="/ask">{t("drawer.ask")}</Link>
          <h4>{t("drawer.workWithUs")}</h4>
          <Link href="/partner">{t("drawer.csr")}</Link>{" "}
          <Link href="/partner">{t("drawer.government")}</Link>{" "}
          <Link href="/partner">{t("drawer.volunteer")}</Link>
          <h4>{t("drawer.about")}</h4>
          <Link href="/about">{t("drawer.story")}</Link>{" "}
          <Link href="/accountability">{t("drawer.accountability")}</Link>{" "}
          <Link href="/contact">{t("drawer.contact")}</Link>
          <div style={{ marginTop: "22px" }}>
            <Button full href="/give">
              {t("donate")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
