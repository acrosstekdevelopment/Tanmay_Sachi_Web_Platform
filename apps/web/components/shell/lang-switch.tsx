"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

// The `.lang` pill from the Approved Design, now a real switch (Agreement
// cl. 3.2): it opens the same page in the other language. Labels are each
// language's own name, so they are not translated.
const LABELS = {
  hi: { full: "हिंदी", short: "हिं" },
  en: { full: "English", short: "EN" },
} as const;

export function LangSwitch({ short = false }: { short?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Language");
  const target = locale === "hi" ? "en" : "hi";
  return (
    <Link
      className="lang"
      href={pathname}
      locale={target}
      lang={target}
      hrefLang={target}
      title={target === "hi" ? t("switchToHindi") : t("switchToEnglish")}
    >
      {short ? LABELS[target].short : LABELS[target].full}
    </Link>
  );
}
