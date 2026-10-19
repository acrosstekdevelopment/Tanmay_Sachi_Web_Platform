import { getTranslations, setRequestLocale } from "next-intl/server";
import { FallbackNotice } from "@/components/shell/fallback-notice";
import { Footer } from "@/components/shell/footer";
import { MobileNav } from "@/components/shell/mobile-nav";
import { TabBar } from "@/components/shell/tab-bar";
import { WebHeader } from "@/components/shell/web-header";
import { hasPublishedContent } from "@/lib/i18n/content";
import type { Locale } from "@/i18n/routing";

// Public site shell, in the Approved Design's DOM order:
// web header, mobile header + drawer, page, footer, mobile tab bar.
export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("Shell");
  // Hindi pages without Hindi content show the English page under the Hindi
  // address; mark that content as English so screen readers read it correctly.
  const fallback = !hasPublishedContent(locale as Locale);
  return (
    <>
      <a className="skip" href="#main">
        {t("skipToContent")}
      </a>
      <div id="app" lang={fallback ? "en" : undefined}>
        <WebHeader />
        <MobileNav />
        <main id="main">
          {fallback && <FallbackNotice />}
          {children}
        </main>
        <Footer />
        <TabBar />
      </div>
    </>
  );
}
