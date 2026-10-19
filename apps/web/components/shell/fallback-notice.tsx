"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

// Shown at the top of a Hindi page whose content has not been published in
// Hindi yet (Agreement cl. 3.2: "fallback to English where a Hindi version is
// not yet published"). The notice itself is English until the Foundation
// supplies its Hindi wording (messages/hi.json, key Language.fallbackNotice).
export function FallbackNotice() {
  const t = useTranslations("Language");
  const pathname = usePathname();
  return (
    <div className="langnote" role="note">
      <div className="wrap">
        <span>{t("fallbackNotice")}</span>{" "}
        <Link className="tlink" href={pathname} locale="en" hrefLang="en">
          {t("fallbackLink")}
        </Link>
      </div>
    </div>
  );
}
