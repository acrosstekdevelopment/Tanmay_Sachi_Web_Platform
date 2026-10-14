"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent, type MouseEvent } from "react";
import { Button, Chip } from "@/components/ui/primitives";
import { Brand } from "@/components/ui/logo";

// `.mhead` (mobile top bar, search, chip strip) and `.drawer` (menu), below 820px.
// Behaviour from the mockup script: burger opens; Close, scrim tap and link
// tap close; the search form goes to the Ask page.
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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
          <span className="lang" lang="hi">
            हिं
          </span>{" "}
          <button
            className="mburger"
            id="burger"
            aria-label="Open menu"
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
            <input id="mq" placeholder="Ask about schemes, training, help…" aria-label="Search" />{" "}
            <button type="button" className="mvoice" aria-label="Speak your question">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C6321F" strokeWidth="1.7" strokeLinecap="round">
                <rect x="9" y="2.5" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3.5" />
              </svg>
            </button>
          </form>
        </div>
        <div className="mstrip">
          <Chip href="/schemes">Schemes for women</Chip>{" "}
          <Chip href="/schemes">Loans without collateral</Chip>{" "}
          <Chip href="/knowledge">How to apply</Chip>{" "}
          <Chip href="/projects">Training near me</Chip>
        </div>
      </div>

      <div className={open ? "drawer open" : "drawer"} id="drawer" onClick={onDrawerClick}>
        <div className="drawer-in" role="dialog" aria-modal="true" aria-label="Menu">
          <Button ghost sm id="drawerClose" style={{ float: "right" }} onClick={() => setOpen(false)}>
            Close
          </Button>
          <h4>Our work</h4>
          <Link href="/work">All four pillars</Link>{" "}
          <Link href="/work/womens-economic-independence">Women&apos;s economic independence</Link>{" "}
          <Link href="/projects">Projects</Link>
          <h4>Find help</h4>
          <Link href="/schemes">Government schemes and deadlines</Link>{" "}
          <Link href="/knowledge">Knowledge base</Link>{" "}
          <Link href="/ask">Ask a question</Link>
          <h4>Work with us</h4>
          <Link href="/partner">Corporate and CSR</Link>{" "}
          <Link href="/partner">Government and institutions</Link>{" "}
          <Link href="/partner">Volunteer or contribute</Link>
          <h4>About</h4>
          <Link href="/about">Our story and team</Link>{" "}
          <Link href="/accountability">Accountability</Link>{" "}
          <Link href="/contact">Contact</Link>
          <div style={{ marginTop: "22px" }}>
            <Button full href="/give">
              Donate
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
