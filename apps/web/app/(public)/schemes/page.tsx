import Link from "next/link";
import type { Metadata } from "next";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Badge, Led, Source, TextLink } from "@/components/ui/primitives";

// Ported verbatim from the Approved Design, page #p-schemes.
// Pass 1 (BUILD_GUIDE §0): static copy from the mockup; data comes in pass 2.

export const metadata: Metadata = { title: "Schemes and updates" };

export default function SchemesPage() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">
              Home
            </Link>
            {" "}
            / Schemes and updates
          </div>
          <h1 className="h-xl" style={{ maxWidth: "17ch" }}>
            Schemes for women, kept current.
          </h1>
          <p className="lede" style={{ marginTop: "18px", maxWidth: "60ch" }}>
            Central and state schemes for women&apos;s enterprise, employment, education and welfare. We mirror the official record, add a plain-language summary, and mark the date each entry was last checked by a person.
          </p>
        </div>
      </div>
      <section className="tight">
        <div className="wrap">
          <div className="syncbar">
            <span>
              <span className="dot" />
              {" "}
              Sources: myScheme (API Setu) · MSME · Startup India · NITI Aayog WEP · state portals
            </span>
            {" "}
            <span>
              Last sync today, 06:00 IST
            </span>
            {" "}
            <span>
              142 entries live · 1 awaiting human review
              {/* cms: feed.review_queue */}
            </span>
          </div>
          <ToggleGroup className="filters" label="Filter schemes" items={["All", "Business and credit", "Startup and innovation", "Skills and training", "Education", "Health and welfare", "Rural and SHG", "Open now", "Closing this month", "My state"]} />
          <div className="schemegrid" style={{ marginTop: "2px" }}>
            <article className="scheme">
              <div className="top">
                <h4>
                  Pradhan Mantri Mudra Yojana
                </h4>
                <Badge variant="open">
                  Open
                </Badge>
              </div>
              <p className="what">
                Collateral-free loans for non-farm micro enterprises in manufacturing, trading and services. The most widely used route for a first business loan.
              </p>
              <dl>
                <div>
                  <dt>
                    Shishu
                  </dt>
                  <dd>
                    up to ₹50,000
                  </dd>
                </div>
                <div>
                  <dt>
                    Kishor
                  </dt>
                  <dd>
                    ₹50,000–₹5 lakh
                  </dd>
                </div>
                <div>
                  <dt>
                    Tarun
                  </dt>
                  <dd>
                    ₹5–10 lakh
                  </dd>
                </div>
                <div>
                  <dt>
                    Tarun Plus
                  </dt>
                  <dd>
                    up to ₹20 lakh
                  </dd>
                </div>
              </dl>
              <p className="small">
                Apply at any bank or NBFC, or through the JanSamarth portal. Several public sector banks run women-specific products on top of the Mudra framework.
              </p>
              <div className="foot">
                <Source dot>
                  mudra.org.in · verified 28 Aug 2026
                </Source>
                <TextLink href="#">
                  Official page
                </TextLink>
              </div>
            </article>
            <article className="scheme">
              <div className="top">
                <h4>
                  Stand-Up India
                </h4>
                <Badge variant="chg">
                  Status changed
                </Badge>
              </div>
              <p className="what">
                Bank loans of ₹10 lakh to ₹1 crore for a greenfield enterprise at least 51% owned by a woman, in manufacturing, services, trading or agriculture-allied activity.
              </p>
              <p className="small" style={{ background: "var(--coral-wash)", borderLeft: "2px solid var(--coral)", padding: "10px 12px" }}>
                The original scheme period has ended. The Finance Minister announced a revamped version in March 2026, which was being drafted at the time of our last check. Ask your branch what is currently open before you spend money on a project report.
              </p>
              <div className="foot">
                <Source dot>
                  standupmitra.in · verified 28 Aug 2026
                </Source>
                <TextLink href="#">
                  Official page
                </TextLink>
              </div>
            </article>
            <article className="scheme">
              <div className="top">
                <h4>
                  PMEGP
                </h4>
                <Badge variant="open">
                  Open
                </Badge>
              </div>
              <p className="what">
                Prime Minister&apos;s Employment Generation Programme. A credit-linked capital subsidy for setting up a new micro-enterprise.
              </p>
              <p className="small">
                Women applicants are treated as a special category, which carries a higher subsidy rate than the general category, and a higher rate again in rural areas. Applications go through the KVIC online portal.
              </p>
              <div className="foot">
                <Source dot>
                  kviconline.gov.in · verified 28 Aug 2026
                </Source>
                <TextLink href="#">
                  Official page
                </TextLink>
              </div>
            </article>
            <article className="scheme">
              <div className="top">
                <h4>
                  Credit Guarantee Fund Trust (CGTMSE)
                </h4>
                <Badge variant="open">
                  Open
                </Badge>
              </div>
              <p className="what">
                Not a loan. A guarantee that lets a bank lend to a small enterprise without collateral.
              </p>
              <p className="small">
                You never apply to CGTMSE yourself. The lender does. The useful question at your branch is: &quot;will you cover this under CGTMSE?&quot;
              </p>
              <div className="foot">
                <Source dot>
                  cgtmse.in · verified 28 Aug 2026
                </Source>
                <TextLink href="#">
                  Official page
                </TextLink>
              </div>
            </article>
            <article className="scheme">
              <div className="top">
                <h4>
                  Startup India Seed Fund Scheme
                </h4>
                <Badge variant="soon">
                  Incubator windows close monthly
                </Badge>
              </div>
              <p className="what">
                Seed funding for DPIIT-recognised startups at proof-of-concept, prototype or early-revenue stage, routed through recognised incubators rather than applied for directly.
              </p>
              <p className="small">
                You apply to an incubator, not to the government. Choose the incubator before you write the application.
              </p>
              <div className="foot">
                <Source dot>
                  seedfund.startupindia.gov.in · verified 28 Aug 2026
                </Source>
                <TextLink href="#">
                  Official page
                </TextLink>
              </div>
            </article>
            <article className="scheme">
              <div className="top">
                <h4>
                  Women Entrepreneurship Platform (WEP)
                </h4>
                <Badge variant="open">
                  Open
                </Badge>
              </div>
              <p className="what">
                NITI Aayog&apos;s platform for women entrepreneurs. Mentoring, networks, incubation links and capital-matching support rather than direct grants.
              </p>
              <p className="small">
                Most useful before you need money, when you need someone who has done it to read your plan.
              </p>
              <div className="foot">
                <Source dot>
                  wep.gov.in · verified 28 Aug 2026
                </Source>
                <TextLink href="#">
                  Official page
                </TextLink>
              </div>
            </article>
            <article className="scheme">
              <div className="top">
                <h4>
                  PM Vishwakarma
                </h4>
                <Badge variant="open">
                  Open
                </Badge>
              </div>
              <p className="what">
                For traditional artisans and craftspeople across eighteen trades, including tailoring, basket weaving, pottery and toy-making. Skill training, a toolkit incentive and collateral-free credit.
              </p>
              <p className="small">
                Registration is through a common service centre, with verification at panchayat or urban local body level.
              </p>
              <div className="foot">
                <Source dot>
                  pmvishwakarma.gov.in · verified 28 Aug 2026
                </Source>
                <TextLink href="#">
                  Official page
                </TextLink>
              </div>
            </article>
            <article className="scheme">
              <div className="top">
                <h4>
                  DAY-NRLM self-help group finance
                </h4>
                <Badge variant="open">
                  Open
                </Badge>
              </div>
              <p className="what">
                Rural livelihoods mission. Self-help group formation, revolving fund, community investment support and bank linkage for rural women.
              </p>
              <p className="small">
                Access is through your block&apos;s mission staff and the local federation, not an online form.
              </p>
              <div className="foot">
                <Source dot>
                  aajeevika.gov.in · verified 28 Aug 2026
                </Source>
                <TextLink href="#">
                  Official page
                </TextLink>
              </div>
            </article>
          </div>
          <div className="mobonly" style={{ marginTop: "14px" }}>
            <a className="mtile" href="#">
              <span className="ic">
                ₹
              </span>
              <div>
                <h4>
                  Mudra Yojana
                </h4>
                <p>
                  Collateral-free, ₹50k to ₹20 lakh
                </p>
              </div>
              <Badge variant="open">
                Open
              </Badge>
            </a>
            {" "}
            <a className="mtile" href="#">
              <span className="ic">
                ↑
              </span>
              <div>
                <h4>
                  Stand-Up India
                </h4>
                <p>
                  ₹10 lakh to ₹1 crore · revamp announced
                </p>
              </div>
              <Badge variant="chg">
                Changed
              </Badge>
            </a>
            {" "}
            <a className="mtile" href="#">
              <span className="ic">
                %
              </span>
              <div>
                <h4>
                  PMEGP
                </h4>
                <p>
                  Subsidy for a new micro-enterprise
                </p>
              </div>
              <Badge variant="open">
                Open
              </Badge>
            </a>
            {" "}
            <a className="mtile" href="#">
              <span className="ic">
                ◇
              </span>
              <div>
                <h4>
                  CGTMSE
                </h4>
                <p>
                  Removes the collateral requirement
                </p>
              </div>
              <Badge variant="open">
                Open
              </Badge>
            </a>
            {" "}
            <a className="mtile" href="#">
              <span className="ic">
                ◈
              </span>
              <div>
                <h4>
                  Startup India Seed Fund
                </h4>
                <p>
                  Through recognised incubators
                </p>
              </div>
              <Badge variant="soon">
                Closing
              </Badge>
            </a>
            {" "}
            <a className="mtile" href="#">
              <span className="ic">
                ◎
              </span>
              <div>
                <h4>
                  PM Vishwakarma
                </h4>
                <p>
                  For artisans, including tailoring
                </p>
              </div>
              <Badge variant="open">
                Open
              </Badge>
            </a>
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <Led>How this page stays current</Led>
          <div className="two">
            <div>
              <p className="pull">
                Automatic where it&apos;s safe. Human where it matters.
              </p>
              <p className="body" style={{ marginTop: "20px" }}>
                A scheduled job pulls scheme records every night from myScheme through API Setu, with the MSME, Startup India and NITI Aayog portals as secondary sources and state portals added as we cover new states.
              </p>
              <p className="body" style={{ marginTop: "14px" }}>
                The job does not publish. It writes to a review queue and flags what changed since the last pull. A person reads the diff, checks the official page, and approves. Only then does the entry update, and the verified date resets.
              </p>
              <p className="body" style={{ marginTop: "14px" }}>
                This is slower than a straight feed by a few hours. It is the difference between an out-of-date deadline being a minor error and being the reason a woman missed her application window.
              </p>
            </div>
            <div>
              <div className="four" style={{ gridTemplateColumns: "1fr", gap: "1px" }}>
                <div>
                  <h4 className="h-sm">
                    1 · Fetch
                  </h4>
                  <p className="small" style={{ marginTop: "4px" }}>
                    Nightly pull from official APIs. Raw records stored with a checksum.
                  </p>
                </div>
                <div>
                  <h4 className="h-sm">
                    2 · Diff
                  </h4>
                  <p className="small" style={{ marginTop: "4px" }}>
                    Compare against the published version. Only changes enter the queue.
                  </p>
                </div>
                <div>
                  <h4 className="h-sm">
                    3 · Review
                  </h4>
                  <p className="small" style={{ marginTop: "4px" }}>
                    A person opens the official page, confirms, and writes the plain-language summary.
                  </p>
                </div>
                <div>
                  <h4 className="h-sm">
                    4 · Publish
                  </h4>
                  <p className="small" style={{ marginTop: "4px" }}>
                    Entry goes live with a new verified date and a link to the source.
                  </p>
                </div>
                <div>
                  <h4 className="h-sm">
                    5 · Expire
                  </h4>
                  <p className="small" style={{ marginTop: "4px" }}>
                    Anything unverified for 90 days is flagged on the page itself, not quietly left up.
                  </p>
                </div>
              </div>
              <p className="small" style={{ marginTop: "16px" }}>
                Government content is republished with attribution to the source department. We add summaries and translations; we never alter the substance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
