import { Footer } from "@/components/shell/footer";
import { MobileNav } from "@/components/shell/mobile-nav";
import { TabBar } from "@/components/shell/tab-bar";
import { WebHeader } from "@/components/shell/web-header";

// Public site shell, in the Approved Design's DOM order:
// web header, mobile header + drawer, page, footer, mobile tab bar.
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div id="app">
        <WebHeader />
        <MobileNav />
        <main id="main">{children}</main>
        <Footer />
        <TabBar />
      </div>
    </>
  );
}
