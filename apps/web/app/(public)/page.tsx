import Link from "next/link";
import type { Metadata } from "next";
import { AskPanel } from "@/components/ask/ask-panel";
import { Badge, Button, Led, Plane, Sheet, Shot, Source, TextLink } from "@/components/ui/primitives";

// Ported verbatim from the Approved Design, page #p-home.
// Pass 1 (BUILD_GUIDE §0): static copy from the mockup; data comes in pass 2.

export const metadata: Metadata = {};

export default function HomePage() {
  return (
    <>
      <section style={{ padding: "44px 0 0" }}>
        <div className="wrap">
          <Plane>
            <div className="hero-grid">
              <div>
                <h1 className="h-xl" style={{ maxWidth: "15ch" }}>
                  Opportunity should not depend on where you&apos;re born.
                </h1>
                <p className="lede" style={{ marginTop: "22px", maxWidth: "52ch" }}>
                  We work with communities, companies and government institutions to widen access to education, skills, health and livelihoods, with women&apos;s economic independence as our founding focus.
                </p>
                <div className="cta">
                  <Button href="/work">
                    Explore our work
                  </Button>
                  {" "}
                  <Button ghost href="/partner">
                    Partner with us
                  </Button>
                  {" "}
                  <TextLink href="/projects">
                    Support a project
                  </TextLink>
                </div>
              </div>
              <Shot style={{ minHeight: "330px" }}>
                <p>
                  Hero photograph — one participant at her work, eye level, natural light, environment visible.
                  {/* cms: home.hero_image */}
                </p>
              </Shot>
            </div>
          </Plane>
        </div>
      </section>
      {/* ===== AI SEARCH ===== */}
      <section className="tight">
        <div className="wrap">
          <AskPanel>
              <span className="ansnote">
                Illustrative response. Shows the answer format, not live data.
              </span>
              <div className="hit">
                <h4>
                  Pradhan Mantri Mudra Yojana — Kishor
                </h4>
                <p>
                  A collateral-free loan between ₹50,000 and ₹5 lakh for a non-farm micro enterprise. A tailoring unit qualifies. You apply at any bank branch or through the JanSamarth portal, with a simple project report and Udyam registration.
                </p>
                <div className="hitmeta">
                  <Badge variant="open">
                    Open
                  </Badge>
                  {" "}
                  <Source dot>
                    Source
                    {" "}
                    <b>
                      mudra.org.in
                    </b>
                    {" "}
                    via myScheme
                  </Source>
                  {" "}
                  <Source>
                    Verified 28 Aug 2026
                  </Source>
                  {" "}
                  <TextLink href="/schemes">
                    Open scheme
                  </TextLink>
                </div>
              </div>
              <div className="hit">
                <h4>
                  Credit Guarantee Fund Trust (CGTMSE)
                </h4>
                <p>
                  This is the mechanism that removes the collateral requirement on small business loans. You do not apply to it directly. Your bank applies on your behalf, so the thing to ask your branch is whether they are covering your loan under CGTMSE.
                </p>
                <div className="hitmeta">
                  <Badge variant="open">
                    Open
                  </Badge>
                  {" "}
                  <Source dot>
                    Source
                    {" "}
                    <b>
                      cgtmse.in
                    </b>
                  </Source>
                  {" "}
                  <Source>
                    Verified 28 Aug 2026
                  </Source>
                  {" "}
                  <TextLink href="/schemes">
                    Open scheme
                  </TextLink>
                </div>
              </div>
              <div className="hit">
                <h4>
                  Guide — Writing a project report a bank will accept
                </h4>
                <p>
                  Most first applications are not rejected because the applicant is ineligible. They are rejected because the project report is thin. This guide walks through the seven things a branch manager looks for.
                </p>
                <div className="hitmeta">
                  <Badge variant="chg">
                    Knowledge base
                  </Badge>
                  {" "}
                  <Source>
                    12 min read · Hindi and English
                  </Source>
                  {" "}
                  <TextLink href="/knowledge/writing-a-project-report-a-bank-will-accept">
                    Read the guide
                  </TextLink>
                </div>
              </div>
              <div className="hit">
                <h4>
                  Our programme — Skills to livelihood
                </h4>
                <p className="ph">
                  Nearest cohort, dates and how to enrol. Filled from the projects collection once locations are published.
                  {/* cms: match: project.pillar = skills, filter by district */}
                </p>
                <div className="hitmeta">
                  <Badge variant="des">
                    Tanmaysaachi programme
                  </Badge>
                  <TextLink href="/work/womens-economic-independence">
                    See the programme
                  </TextLink>
                </div>
              </div>
              <div className="escalate">
                <div style={{ flex: "1", minWidth: "230px" }}>
                  <strong style={{ fontSize: "15.5px" }}>
                    Not sure this fits your situation?
                  </strong>
                  <p className="small" style={{ marginTop: "3px" }}>
                    We never tell you that you are eligible. Only the department can. But someone here will read your case and tell you what to ask for.
                  </p>
                </div>
                <Button sm href="/contact">
                  Talk to someone
                </Button>
              </div>
          </AskPanel>
          <p className="small" style={{ marginTop: "12px" }}>
            Answers are drawn only from official scheme records and our own published material. Every claim carries its source and the date it was last checked. We do not give legal, medical or financial advice.
          </p>
        </div>
      </section>
      {/* ===== TRUST REGISTER ===== */}
      <section className="tight deskonly">
        <div className="wrap">
          <dl className="four" style={{ borderTop: "1px solid var(--ink)" }}>
            <div>
              <dt className="small">
                Legal form
              </dt>
              <dd className="h-sm" style={{ marginTop: "4px" }}>
                Section 8 non-profit
              </dd>
            </div>
            <div>
              <dt className="small">
                CIN
              </dt>
              <dd className="h-sm ph" style={{ marginTop: "4px" }}>
                U—————
                {/* cms: org.cin */}
              </dd>
            </div>
            <div>
              <dt className="small">
                12AB · 80G
              </dt>
              <dd className="h-sm ph" style={{ marginTop: "4px" }}>
                —— · ——
                {/* cms: shows only if granted */}
              </dd>
            </div>
            <div>
              <dt className="small">
                CSR-1
              </dt>
              <dd className="h-sm ph" style={{ marginTop: "4px" }}>
                ——
                {/* cms: credential[csr1] */}
              </dd>
            </div>
          </dl>
        </div>
      </section>
      {/* ===== UPDATES: SCHEMES ===== */}
      <section className="alt">
        <div className="wrap">
          <Led>Updates</Led>
          <div className="two lean" style={{ alignItems: "end", marginBottom: "22px" }}>
            <h2 className="h-lg" style={{ maxWidth: "20ch" }}>
              What changed this week in schemes for women.
            </h2>
            <p className="lede">
              Pulled from official sources, checked by a person, then published. Never the other way round.
            </p>
          </div>
          <div className="syncbar">
            <span>
              <span className="dot" />
              {" "}
              Synced from myScheme, MSME, Startup India and NITI Aayog WEP
            </span>
            {" "}
            <span>
              Last sync: today, 06:00 IST
            </span>
            {" "}
            <span>
              4 changes reviewed and published · 1 awaiting review
              {/* cms: feed.review_queue */}
            </span>
          </div>
          <div className="schemegrid deskonly" style={{ marginTop: "2px" }}>
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
                Collateral-free loans for micro enterprises, including first-time women-led units.
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
                Tarun Plus is for borrowers who have already repaid a Mudra loan.
              </p>
              <div className="foot">
                <Source dot>
                  mudra.org.in · verified 28 Aug 2026
                </Source>
                <TextLink href="/schemes">
                  Details
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
                Loans of ₹10 lakh to ₹1 crore for a new enterprise at least 51% owned by a woman.
              </p>
              <p className="small" style={{ background: "var(--coral-wash)", borderLeft: "2px solid var(--coral)", padding: "10px 12px" }}>
                The original scheme period has ended. A revamped version was announced by the Finance Minister in March 2026 and is being drafted. Confirm current status with your bank before preparing an application.
              </p>
              <div className="foot">
                <Source dot>
                  standupmitra.in · verified 28 Aug 2026
                </Source>
                <TextLink href="/schemes">
                  Details
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
                Credit-linked subsidy for setting up a new micro-enterprise. Women applicants fall in the special category, which carries a higher subsidy rate than the general category.
              </p>
              <div className="foot">
                <Source dot>
                  kviconline.gov.in · verified 28 Aug 2026
                </Source>
                <TextLink href="/schemes">
                  Details
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
                Seed funding routed through recognised incubators, for DPIIT-recognised startups at proof-of-concept and early revenue stage.
              </p>
              <div className="foot">
                <Source dot>
                  seedfund.startupindia.gov.in · verified 28 Aug 2026
                </Source>
                <TextLink href="/schemes">
                  Details
                </TextLink>
              </div>
            </article>
          </div>
          <div className="carousel" tabIndex={0} role="region" aria-label="Scheme updates">
            <article className="card wide">
              <Badge variant="open" style={{ alignSelf: "flex-start" }}>
                Open
              </Badge>
              <h4>
                Pradhan Mantri Mudra Yojana
              </h4>
              <p>
                Collateral-free loans from ₹50,000 to ₹20 lakh for micro enterprises.
              </p>
              <Source dot>
                verified 28 Aug
              </Source>
            </article>
            <article className="card wide">
              <Badge variant="chg" style={{ alignSelf: "flex-start" }}>
                Status changed
              </Badge>
              <h4>
                Stand-Up India
              </h4>
              <p>
                Original period ended. Revamp announced March 2026. Check before applying.
              </p>
              <Source dot>
                verified 28 Aug
              </Source>
            </article>
            <article className="card wide">
              <Badge variant="open" style={{ alignSelf: "flex-start" }}>
                Open
              </Badge>
              <h4>
                PMEGP
              </h4>
              <p>
                Subsidy for a new micro-enterprise. Higher rate for women applicants.
              </p>
              <Source dot>
                verified 28 Aug
              </Source>
            </article>
            <article className="card wide">
              <Badge variant="soon" style={{ alignSelf: "flex-start" }}>
                Closing soon
              </Badge>
              <h4>
                Startup India Seed Fund
              </h4>
              <p>
                Seed funding through recognised incubators.
              </p>
              <Source dot>
                verified 28 Aug
              </Source>
            </article>
          </div>
          <div style={{ marginTop: "22px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <Button href="/schemes">
              See all schemes and deadlines
            </Button>
            {" "}
            <span className="small">
              Always confirm on the official page before you apply. We mirror; we do not decide.
            </span>
          </div>
        </div>
      </section>
      {/* ===== WHY WE EXIST ===== */}
      <section>
        <div className="wrap">
          <Led>Why we exist</Led>
          <div className="two lean">
            <div>
              <h2 className="h-lg">
                Potential is everywhere. Opportunity isn&apos;t.
              </h2>
              <p className="lede" style={{ marginTop: "20px" }}>
                A girl finishes school in a district where nobody will hire her. A woman runs a business for eleven years without ever holding a bank loan. A screening camp finds a condition and nobody follows up.
              </p>
              <p className="lede" style={{ marginTop: "16px" }}>
                The capability was never missing. The access was. Tanmaysaachi exists to close that distance, and to prove that it closed.
              </p>
            </div>
            <Shot>
              <p>
                Place photograph — the community where we work. Establishes geography.
                {/* cms: home.why_image */}
              </p>
            </Shot>
          </div>
        </div>
      </section>
      {/* ===== PILLARS ===== */}
      <section className="alt">
        <div className="wrap">
          <Led>What we do</Led>
          <h2 className="h-lg" style={{ maxWidth: "22ch", marginBottom: "34px" }}>
            Four pillars, one route through all of them.
          </h2>
          <div className="rowlist deskonly">
            <Link className="row" href="/work/womens-economic-independence">
              <h3>
                Women&apos;s economic independence
                <div className="spine">
                  Skill → Income → Ownership → Independence
                </div>
              </h3>
              <div>
                <p>
                  Skills, micro-enterprise, financial literacy, self-help group enablement, and the credit and market links that turn a trade into an income.
                </p>
              </div>
              <div>
                <Badge variant="on">
                  Active
                </Badge>
              </div>
            </Link>
            {" "}
            <Link className="row" href="/work/womens-economic-independence">
              <h3>
                Learning &amp; digital access
                <div className="spine">
                  Access → Learn → Capability → Opportunity
                </div>
              </h3>
              <div>
                <p>
                  Digital and AI literacy, learning support, career guidance, and the classroom infrastructure that makes any of it possible.
                </p>
              </div>
              <div>
                <Badge variant="on">
                  Active
                </Badge>
              </div>
            </Link>
            {" "}
            <Link className="row" href="/work/womens-economic-independence">
              <h3>
                Skills to livelihood
                <div className="spine">
                  Train → Certify → Place → Progress
                </div>
              </h3>
              <div>
                <p>
                  Vocational and technology skilling, employability, entrepreneurship support, and direct linkage to employers who are actually hiring.
                </p>
              </div>
              <div>
                <Badge variant="des">
                  In design
                </Badge>
              </div>
            </Link>
            {" "}
            <Link className="row" href="/work/womens-economic-independence">
              <h3>
                Health access
                <div className="spine">
                  Awareness → Screening → Intervention → Referral → Follow-up
                </div>
              </h3>
              <div>
                <p>
                  Preventive and women&apos;s health, screening, and the follow-up most camps never do. A camp is an output. A completed referral is an outcome.
                </p>
              </div>
              <div>
                <Badge variant="pl">
                  Planned
                </Badge>
              </div>
            </Link>
          </div>
          <div className="mobonly" style={{ marginTop: "16px" }}>
            <Link className="mtile" href="/work/womens-economic-independence">
              <span className="ic">
                1
              </span>
              <div>
                <h4>
                  Women&apos;s economic independence
                </h4>
                <p>
                  Skill → Income → Ownership
                </p>
              </div>
              <Badge variant="on">
                Active
              </Badge>
            </Link>
            {" "}
            <Link className="mtile" href="/work/womens-economic-independence">
              <span className="ic">
                2
              </span>
              <div>
                <h4>
                  Learning &amp; digital access
                </h4>
                <p>
                  Access → Learn → Capability
                </p>
              </div>
              <Badge variant="on">
                Active
              </Badge>
            </Link>
            {" "}
            <Link className="mtile" href="/work/womens-economic-independence">
              <span className="ic">
                3
              </span>
              <div>
                <h4>
                  Skills to livelihood
                </h4>
                <p>
                  Train → Certify → Place
                </p>
              </div>
              <Badge variant="des">
                In design
              </Badge>
            </Link>
            {" "}
            <Link className="mtile" href="/work/womens-economic-independence">
              <span className="ic">
                4
              </span>
              <div>
                <h4>
                  Health access
                </h4>
                <p>
                  Screening → Referral → Follow-up
                </p>
              </div>
              <Badge variant="pl">
                Planned
              </Badge>
            </Link>
          </div>
        </div>
      </section>
      {/* ===== NUMBERS ===== */}
      <section>
        <div className="wrap">
          <Led>Impact in numbers</Led>
          <div className="two lean" style={{ alignItems: "end", marginBottom: "30px" }}>
            <h2 className="h-lg" style={{ maxWidth: "20ch" }}>
              Every figure here carries a source and a date.
            </h2>
            <p className="lede">
              A number without a method behind it is decoration. These slots stay empty until the data is verified and signed off.
            </p>
          </div>
          <div className="nums">
            <div>
              <div className="fig">
                —
              </div>
              <div className="lab">
                Women supported
                <div className="small">
                  Awaiting verified figure
                  {/* cms: metric.verified=false */}
                </div>
              </div>
            </div>
            <div>
              <div className="fig">
                —
              </div>
              <div className="lab">
                People trained
                <div className="small">
                  Awaiting verified figure
                </div>
              </div>
            </div>
            <div>
              <div className="fig">
                —
              </div>
              <div className="lab">
                Districts
                <div className="small">
                  Awaiting verified figure
                </div>
              </div>
            </div>
            <div>
              <div className="fig">
                —
              </div>
              <div className="lab">
                Projects completed
                <div className="small">
                  Awaiting verified figure
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== METHOD ===== */}
      <section className="alt">
        <div className="wrap">
          <Led>How we work</Led>
          <div className="two lean" style={{ alignItems: "end", marginBottom: "36px" }}>
            <h2 className="h-lg" style={{ maxWidth: "19ch" }}>
              We don&apos;t distribute things. We run a method.
            </h2>
            <p className="lede">
              The same five steps govern every project, which is why a partner can predict what working with us looks like before signing anything.
            </p>
          </div>
          <ol className="method">
            <li className="step">
              <div className="n">
                1
              </div>
              <h4>
                Listen
              </h4>
              <p>
                Time in the community before any design. What people say they need is rarely what a proposal assumes.
              </p>
            </li>
            <li className="step">
              <div className="n">
                2
              </div>
              <h4>
                Design
              </h4>
              <p>
                A costed intervention with objectives written down and locked before the first rupee is spent.
              </p>
            </li>
            <li className="step">
              <div className="n">
                3
              </div>
              <h4>
                Deliver
              </h4>
              <p>
                Implementation with named local partners who stay after we leave.
              </p>
            </li>
            <li className="step">
              <div className="n">
                4
              </div>
              <h4>
                Measure
              </h4>
              <p>
                Participation and outcomes tracked as the work happens, not reconstructed at the end.
              </p>
            </li>
            <li className="step">
              <div className="n">
                5
              </div>
              <h4>
                Improve
              </h4>
              <p>
                Evidence changes the next cohort. What doesn&apos;t work gets published too.
              </p>
            </li>
          </ol>
        </div>
      </section>
      {/* ===== FEATURED PROJECT ===== */}
      <section>
        <div className="wrap">
          <Led>Featured project</Led>
          <Sheet>
            <h3 className="h-md ph">
              Project name
              {/* cms: project.name */}
            </h3>
            <dl className="meta">
              <div>
                <dt>
                  Status
                </dt>
                <dd>
                  Active
                </dd>
              </div>
              <div>
                <dt>
                  District
                </dt>
                <dd className="ph">
                  ——
                </dd>
              </div>
              <div>
                <dt>
                  Participants
                </dt>
                <dd className="ph">
                  ——
                </dd>
              </div>
              <div>
                <dt>
                  Started
                </dt>
                <dd className="ph">
                  ——
                </dd>
              </div>
            </dl>
            <div className="two" style={{ marginTop: "26px" }}>
              <div>
                <h4 className="h-sm">
                  Funding
                </h4>
                <div className="bar">
                  <i />
                </div>
                <p className="small">
                  <span className="ph">
                    ₹——
                  </span>
                  {" "}
                  raised of
                  {" "}
                  <span className="ph">
                    ₹——
                  </span>
                  {" "}
                  required
                  {/* cms: computed */}
                </p>
              </div>
              <div>
                <h4 className="h-sm">
                  What your contribution funds
                </h4>
                <ul className="tiers" style={{ marginTop: "10px" }}>
                  <li>
                    <b>
                      ₹500
                    </b>
                    <span className="ph">
                      derived from a cost line
                    </span>
                  </li>
                  <li>
                    <b>
                      ₹2,500
                    </b>
                    <span className="ph">
                      derived from a cost line
                    </span>
                  </li>
                  <li>
                    <b>
                      ₹10,000
                    </b>
                    <span className="ph">
                      derived from a cost line
                    </span>
                  </li>
                </ul>
                <Button style={{ marginTop: "18px" }} href="/projects/featured">
                  Open the project
                </Button>
              </div>
            </div>
          </Sheet>
        </div>
      </section>
      {/* ===== KNOWLEDGE TEASER ===== */}
      <section className="alt">
        <div className="wrap">
          <Led>Knowledge base</Led>
          <div className="two lean" style={{ alignItems: "end", marginBottom: "26px" }}>
            <h2 className="h-lg" style={{ maxWidth: "21ch" }}>
              Guides that get someone through a door, and research that explains why the door was shut.
            </h2>
            <p className="lede">
              Two kinds of writing, one library. Both free, both in Hindi and English.
            </p>
          </div>
          <div className="three deskonly">
            <Link href="/knowledge/writing-a-project-report-a-bank-will-accept">
              <div className="small" style={{ color: "var(--coral-ink)", fontWeight: "500" }}>
                Guide
              </div>
              <h3 className="h-md" style={{ marginTop: "8px" }}>
                Writing a project report a bank will accept
              </h3>
              <p className="small" style={{ marginTop: "8px" }}>
                12 min · Hindi and English · practical, with a template
              </p>
            </Link>
            {" "}
            <Link href="/knowledge">
              <div className="small" style={{ color: "var(--coral-ink)", fontWeight: "500" }}>
                Research
              </div>
              <h3 className="h-md" style={{ marginTop: "8px" }}>
                Why collateral-free credit still doesn&apos;t reach rural women
              </h3>
              <p className="small" style={{ marginTop: "8px" }}>
                18 min · with sources and data
              </p>
            </Link>
            {" "}
            <Link href="/knowledge">
              <div className="small" style={{ color: "var(--coral-ink)", fontWeight: "500" }}>
                Field note
              </div>
              <h3 className="h-md" style={{ marginTop: "8px" }}>
                What we got wrong in our first training cohort
              </h3>
              <p className="small" style={{ marginTop: "8px" }}>
                7 min · from the field
              </p>
            </Link>
          </div>
          <div className="carousel">
            <Link className="card" href="/knowledge/writing-a-project-report-a-bank-will-accept">
              <span className="small" style={{ color: "var(--coral-ink)" }}>
                Guide
              </span>
              <h4>
                Writing a project report a bank will accept
              </h4>
              <p>
                12 min · with a template
              </p>
            </Link>
            {" "}
            <Link className="card" href="/knowledge">
              <span className="small" style={{ color: "var(--coral-ink)" }}>
                Research
              </span>
              <h4>
                Why collateral-free credit still doesn&apos;t reach rural women
              </h4>
              <p>
                18 min · with sources
              </p>
            </Link>
            {" "}
            <Link className="card" href="/knowledge">
              <span className="small" style={{ color: "var(--coral-ink)" }}>
                Field note
              </span>
              <h4>
                What we got wrong in our first cohort
              </h4>
              <p>
                7 min
              </p>
            </Link>
          </div>
          <div style={{ marginTop: "22px" }}>
            <Button ghost href="/knowledge">
              Open the knowledge base
            </Button>
          </div>
        </div>
      </section>
      {/* ===== PARTNER ===== */}
      <section>
        <div className="wrap">
          <Led>Partner with us</Led>
          <h2 className="h-lg" style={{ maxWidth: "24ch", marginBottom: "32px" }}>
            Three ways in, each with a different first conversation.
          </h2>
          <div className="three deskonly">
            <div>
              <h3 className="h-md">
                Corporate &amp; CSR
              </h3>
              <p className="body" style={{ marginTop: "9px", fontSize: "16px" }}>
                For CSR heads and corporate foundations who need a partner their committee will sign off.
              </p>
              <Button style={{ marginTop: "18px" }} href="/partner">
                Discuss a CSR partnership
              </Button>
            </div>
            <div>
              <h3 className="h-md">
                Government &amp; institutions
              </h3>
              <p className="body" style={{ marginTop: "9px", fontSize: "16px" }}>
                For departments, missions and PSUs looking for a documented implementation partner at district scale.
              </p>
              <Button ghost style={{ marginTop: "18px" }} href="/partner">
                Explore institutional partnership
              </Button>
            </div>
            <div>
              <h3 className="h-md">
                Contribute
              </h3>
              <p className="body" style={{ marginTop: "9px", fontSize: "16px" }}>
                For people who want to give something other than money. Most of what we need isn&apos;t funding.
              </p>
              <Button ghost style={{ marginTop: "18px" }} href="/partner">
                Find a role
              </Button>
            </div>
          </div>
          <div className="mobonly">
            <Link className="mtile" href="/partner">
              <span className="ic">
                C
              </span>
              <div>
                <h4>
                  Corporate &amp; CSR
                </h4>
                <p>
                  Programme design, delivery and committee-ready reporting
                </p>
              </div>
            </Link>
            {" "}
            <Link className="mtile" href="/partner">
              <span className="ic">
                G
              </span>
              <div>
                <h4>
                  Government &amp; institutions
                </h4>
                <p>
                  District-scale delivery, documented
                </p>
              </div>
            </Link>
            {" "}
            <Link className="mtile" href="/partner">
              <span className="ic">
                V
              </span>
              <div>
                <h4>
                  Volunteer or contribute
                </h4>
                <p>
                  Time, skills, equipment, mentoring
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* ===== ACCOUNTABILITY ===== */}
      <section className="alt">
        <div className="wrap">
          <Led>Accountability</Led>
          <div className="two lean" style={{ alignItems: "end" }}>
            <h2 className="h-lg" style={{ maxWidth: "20ch" }}>
              Trust is something you should be able to check.
            </h2>
            <p className="lede">
              Including the last one. Most organisations publish what they&apos;ve achieved. Fewer publish what they haven&apos;t.
            </p>
          </div>
          <div className="four" style={{ marginTop: "26px" }}>
            <Link href="/accountability">
              <h4 className="h-sm">
                Registrations
              </h4>
              <p className="small" style={{ marginTop: "5px" }}>
                Every credential we hold, with numbers and dates. And every one we don&apos;t.
              </p>
            </Link>
            {" "}
            <Link href="/accountability">
              <h4 className="h-sm">
                Governance
              </h4>
              <p className="small" style={{ marginTop: "5px" }}>
                Board and leadership. Real names, real bios, declared interests.
              </p>
            </Link>
            {" "}
            <Link href="/accountability">
              <h4 className="h-sm">
                Financials
              </h4>
              <p className="small" style={{ marginTop: "5px" }}>
                Audited statements, annual reports, project utilisation.
              </p>
            </Link>
            {" "}
            <Link href="/accountability">
              <h4 className="h-sm">
                What we haven&apos;t proven
              </h4>
              <p className="small" style={{ marginTop: "5px" }}>
                The claims we can&apos;t yet support, and what would change that.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
