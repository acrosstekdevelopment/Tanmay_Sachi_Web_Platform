import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/primitives";

// 404. Not in the Approved Design (TDD Appendix A: "to be designed and
// approved"); built from the page-head pattern so it can be approved as a sample.
export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">{t("home")}</Link> / {t("crumb")}
          </div>
          <h1 className="h-xl" style={{ maxWidth: "16ch" }}>
            {t("title")}
          </h1>
          <p className="lede" style={{ marginTop: "18px", maxWidth: "56ch" }}>
            {t("lede")}
          </p>
        </div>
      </div>
      <section className="tight">
        <div className="wrap">
          <div className="cta" style={{ marginTop: 0 }}>
            <Button href="/schemes">{t("schemes")}</Button>
            <Button ghost href="/knowledge">
              {t("knowledge")}
            </Button>
            <Button ghost href="/ask">
              {t("ask")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
