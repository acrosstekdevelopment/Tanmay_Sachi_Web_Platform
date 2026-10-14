"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/primitives";
import { Brand } from "@/components/ui/logo";

// `.webhead` — desktop sticky header (≥820px). Active link = current route,
// matching the mockup's `data-nav` + `.on` behaviour (top-level pages only).
const NAV = [
  { href: "/work", label: "Our work" },
  { href: "/projects", label: "Projects" },
  { href: "/schemes", label: "Schemes" },
  { href: "/knowledge", label: "Knowledge" },
  { href: "/partner", label: "Partner" },
  { href: "/accountability", label: "Accountability" },
  { href: "/about", label: "About" },
];

export function WebHeader() {
  const pathname = usePathname();
  return (
    <header className="webhead">
      <div className="wrap hbar">
        <Link className="brand" href="/">
          <Brand size={36} />
        </Link>
        <nav className="webnav" aria-label="Main">
          {NAV.map((item) => {
            const on = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={on ? "on" : undefined}
                aria-current={on ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}{" "}
          <span className="lang" lang="hi">
            हिंदी
          </span>{" "}
          <Button sm href="/give">
            Donate
          </Button>
        </nav>
      </div>
    </header>
  );
}
