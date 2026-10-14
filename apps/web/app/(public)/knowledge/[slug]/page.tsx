import Link from "next/link";
import type { Metadata } from "next";
import { Chip, TextLink } from "@/components/ui/primitives";

// Ported verbatim from the Approved Design, page #p-article.
// Pass 1 (BUILD_GUIDE §0): static copy from the mockup; data comes in pass 2.

export const metadata: Metadata = { title: "Writing a project report a bank will accept" };

// One seeded record until the content tables exist (pass 2).
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: "writing-a-project-report-a-bank-will-accept" }];
}

export default function ArticlePage() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">
              Home
            </Link>
            {" "}
            /
            {" "}
            <Link href="/knowledge">
              Knowledge base
            </Link>
            {" "}
            / Guide
          </div>
          <div className="arthead">
            <div className="kind" style={{ fontSize: "13px", fontWeight: "500", color: "var(--coral-ink)" }}>
              Guide · Credit and finance
            </div>
            <h1 className="h-xl" style={{ marginTop: "10px" }}>
              Writing a project report a bank will accept
            </h1>
            <p className="lede" style={{ marginTop: "16px" }}>
              Most first applications are not rejected because the applicant is ineligible. They are rejected because the project report is thin.
            </p>
            <div className="hitmeta" style={{ marginTop: "18px" }}>
              <span className="small">
                12 min read
              </span>
              <span className="small">
                Updated 14 August 2026
              </span>
              {" "}
              <span className="small">
                Available in हिंदी
              </span>
              <TextLink href="#">
                Download as PDF
              </TextLink>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="two lean" style={{ gap: "clamp(26px,5vw,80px)" }}>
            <div className="artbody">
              <p>
                A branch manager reading a loan application under Mudra or PMEGP is not asking whether you deserve the money. They are asking a narrower question: if this business does not work, will the file show that I did my job properly? Everything in a good project report answers that question.
              </p>
              <p>
                This guide assumes a first-time applicant, a business under ₹10 lakh, and no accountant. It takes about a day to do properly.
              </p>
              <h3 id="s1">
                1. Say what the business is in one sentence
              </h3>
              <p>
                Not &quot;tailoring and related activities.&quot; Write &quot;a tailoring unit stitching school uniforms and blouses, operating from a rented room in the village market, run by me with one helper.&quot; A reader who cannot picture the business in ten seconds will not read the next page carefully.
              </p>
              <h3 id="s2">
                2. Show that you already know the trade
              </h3>
              <p>
                This is the single most persuasive page in the file, and the one most applicants skip. Include whichever of these you have:
              </p>
              <ul>
                <li>
                  Training certificates, even short ones
                </li>
                <li>
                  How long you have done this work, including unpaid or home-based work
                </li>
                <li>
                  Photographs of what you have made
                </li>
                <li>
                  Names of people who already buy from you, and roughly how much
                </li>
              </ul>
              <p>
                Existing informal income is not a weakness in the file. It is evidence. Say it plainly.
              </p>
              <h3 id="s3">
                3. Cost the machine, not the dream
              </h3>
              <p>
                List every item you will buy with actual quoted prices, on the supplier&apos;s letterhead if you can get it. Two quotes for anything above ₹25,000. A cost sheet with round numbers reads as guesswork; a cost sheet with ₹8,340 in it reads as someone who has been to the shop.
              </p>
              <blockquote>
                A cost sheet with round numbers reads as guesswork. A cost sheet with ₹8,340 in it reads as someone who has been to the shop.
              </blockquote>
              <h3 id="s4">
                4. Be honest about the working capital
              </h3>
              <p>
                Most first businesses fail on working capital, not on equipment, and experienced lenders know this. Show three months of cloth, thread, electricity, rent and your own basic drawings. Asking for slightly more and justifying it is stronger than asking for too little and going back in month four.
              </p>
              <h3 id="s5">
                5. Make the income projection boring
              </h3>
              <p>
                Pieces per day, days per month, price per piece, minus material cost. One table. Use a conservative number and say why it is conservative. Projections that show a business tripling in year two are read as fiction and they weaken the whole file.
              </p>
              <h3 id="s6">
                6. Name your buyers
              </h3>
              <p>
                &quot;Local market&quot; is not a market. Two schools, one boutique and the weekly haat is a market. If you have spoken to them, say so and give the name of the person you spoke to.
              </p>
              <h3 id="s7">
                7. Attach the documents in the order the form lists them
              </h3>
              <p>
                Aadhaar, PAN, address proof, Udyam registration, caste certificate if you are claiming a special category, quotations, photographs, bank statements. Number the pages. An organised file is read differently from a loose bundle, and that difference is not rational, but it is real.
              </p>
              <h3 id="s8">
                Before you go to the branch
              </h3>
              <ul>
                <li>
                  Complete Udyam registration first. It is free and it takes twenty minutes.
                </li>
                <li>
                  Ask whether the branch will cover the loan under CGTMSE. This is the mechanism that removes the collateral requirement, and it is the lender&apos;s decision, not yours.
                </li>
                <li>
                  Take two copies. Leave one, keep one with the date and the name of the officer you gave it to.
                </li>
                <li>
                  If it is refused, ask for the reason in writing. Most refusals are fixable, and a written reason tells you what to fix.
                </li>
              </ul>
              <div className="sources">
                <h4 className="h-sm">
                  Sources and further reading
                </h4>
                <ul>
                  <li>
                    Pradhan Mantri Mudra Yojana — official scheme documentation, mudra.org.in
                  </li>
                  <li>
                    PMEGP application guidelines — KVIC online portal, kviconline.gov.in
                  </li>
                  <li>
                    Credit Guarantee Fund Trust for Micro and Small Enterprises — cgtmse.in
                  </li>
                  <li>
                    Udyam registration portal — udyamregistration.gov.in
                  </li>
                </ul>
                <p className="small" style={{ marginTop: "16px" }}>
                  This guide explains a process. It is not financial advice, and lending decisions rest entirely with the bank. Scheme terms change; check the official pages linked above before you apply.
                </p>
              </div>
              <div style={{ marginTop: "34px", padding: "20px 22px", background: "var(--paper-alt)", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                <strong style={{ fontSize: "15.5px" }}>
                  Was this useful?
                </strong>
                {" "}
                <Chip>
                  Yes
                </Chip>
                <Chip>
                  Partly
                </Chip>
                <Chip>
                  No
                </Chip>
                {" "}
                <span className="small">
                  Feedback decides what we write next.
                </span>
              </div>
            </div>
            <aside>
              <div className="toc">
                <h4>
                  On this page
                </h4>
                <a href="#s1">
                  Say what the business is
                </a>
                {" "}
                <a href="#s2">
                  Show you know the trade
                </a>
                {" "}
                <a href="#s3">
                  Cost the machine
                </a>
                {" "}
                <a href="#s4">
                  Working capital
                </a>
                {" "}
                <a href="#s5">
                  Income projection
                </a>
                {" "}
                <a href="#s6">
                  Name your buyers
                </a>
                {" "}
                <a href="#s7">
                  Document order
                </a>
                {" "}
                <a href="#s8">
                  Before the branch
                </a>
                <div style={{ marginTop: "22px", paddingTop: "18px", borderTop: "1px solid var(--rule)" }}>
                  <h4>
                    Related schemes
                  </h4>
                  <Link href="/schemes">
                    Mudra Yojana
                  </Link>
                  {" "}
                  <Link href="/schemes">
                    PMEGP
                  </Link>
                  {" "}
                  <Link href="/schemes">
                    CGTMSE
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
