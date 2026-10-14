import Link from "next/link";

// Footer, verbatim from the Approved Design. The legal block stays as `.ph`
// placeholders: credential values are never invented (BUILD_GUIDE §7); they
// render from the credentials record once it exists. Policy links point to
// pages that are still to be designed (TDD Appendix A), as in the mockup.
export function Footer() {
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
            <br /> FCRA: not registered
          </div>
          <div>
            <h4>Our work</h4>
            <ul>
              <li>
                <Link href="/work">All four pillars</Link>
              </li>
              <li>
                <Link href="/work/womens-economic-independence">Women&apos;s independence</Link>
              </li>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/work">How we work</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Find help</h4>
            <ul>
              <li>
                <Link href="/schemes">Schemes and updates</Link>
              </li>
              <li>
                <Link href="/knowledge">Knowledge base</Link>
              </li>
              <li>
                <Link href="/ask">Ask a question</Link>
              </li>
              <li>
                <Link href="/contact">Request a callback</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Accountability</h4>
            <ul>
              <li>
                <Link href="/accountability">Registrations</Link>
              </li>
              <li>
                <Link href="/accountability">Governance</Link>
              </li>
              <li>
                <Link href="/accountability">Financials</Link>
              </li>
              <li>
                <Link href="/accountability">What we haven&apos;t proven</Link>
              </li>
              <li>
                <Link href="/contact">Grievance redressal</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="f-bot">
          <span>© 2026 Tanmaysaachi Mahila Empower Foundation</span>{" "}
          <span>
            <a href="#">Privacy</a> &nbsp; <a href="#">Donation policy</a> &nbsp; <a href="#">Refund</a> &nbsp;{" "}
            <a href="#">Terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
