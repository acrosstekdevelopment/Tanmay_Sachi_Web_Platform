import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// Footer, verbatim from the Approved Design. The legal block stays as `.ph`
// placeholders: credential values are never invented (BUILD_GUIDE §7); they
// render from the credentials record once it exists. Policy links point to
// pages that are still to be designed (TDD Appendix A), as in the mockup.
export async function Footer() {
  const t = await getTranslations("Shell.footer");
  return (
    <footer>
      <div className="wrap">
        <div className="f-top">
          <div className="legal">
            <b>Tanmaysaachi Mahila Empower Foundation</b>{" "}
            <span className="ph">
              Registered office address
              <br />
              CIN —— · PAN ——
              <br />
              NGO Darpan ——
              <br />
              Section 8 licence ——
              <br />
              12AB —— · 80G —— · CSR-1 ——
            </span>
            <br /> {t("fcra")}
          </div>
          <div>
            <h4>{t("ourWork")}</h4>
            <ul>
              <li>
                <Link href="/work">{t("allPillars")}</Link>
              </li>
              <li>
                <Link href="/work/womens-economic-independence">{t("womensIndependence")}</Link>
              </li>
              <li>
                <Link href="/projects">{t("projects")}</Link>
              </li>
              <li>
                <Link href="/work">{t("howWeWork")}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>{t("findHelp")}</h4>
            <ul>
              <li>
                <Link href="/schemes">{t("schemes")}</Link>
              </li>
              <li>
                <Link href="/knowledge">{t("knowledge")}</Link>
              </li>
              <li>
                <Link href="/ask">{t("ask")}</Link>
              </li>
              <li>
                <Link href="/contact">{t("callback")}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>{t("accountability")}</h4>
            <ul>
              <li>
                <Link href="/accountability">{t("registrations")}</Link>
              </li>
              <li>
                <Link href="/accountability">{t("governance")}</Link>
              </li>
              <li>
                <Link href="/accountability">{t("financials")}</Link>
              </li>
              <li>
                <Link href="/accountability">{t("unproven")}</Link>
              </li>
              <li>
                <Link href="/contact">{t("grievance")}</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="f-bot">
          <span>{t("copyright")}</span>{" "}
          <span>
            <a href="#">{t("privacy")}</a> &nbsp; <a href="#">{t("donationPolicy")}</a> &nbsp;{" "}
            <a href="#">{t("refund")}</a> &nbsp; <a href="#">{t("terms")}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
