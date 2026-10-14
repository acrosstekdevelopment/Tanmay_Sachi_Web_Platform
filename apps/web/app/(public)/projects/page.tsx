import Link from "next/link";
import type { Metadata } from "next";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/primitives";

// Ported verbatim from the Approved Design, page #p-projects.
// Pass 1 (BUILD_GUIDE §0): static copy from the mockup; data comes in pass 2.

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">
              Home
            </Link>
            {" "}
            / Projects
          </div>
          <h1 className="h-xl" style={{ maxWidth: "16ch" }}>
            Projects
          </h1>
          <p className="lede" style={{ marginTop: "18px", maxWidth: "58ch" }}>
            Every project is published with its budget, its objectives and its measurement definitions locked before it starts, and its results published whether or not they are good.
          </p>
        </div>
      </div>
      <section className="tight">
        <div className="wrap">
          <ToggleGroup className="filters" label="Filter projects" items={["All", "Upcoming", "Active", "Completed", "Women's independence", "Learning", "Skills", "Health"]} />
          <div className="rowlist">
            <Link className="row" href="/projects/featured">
              <h3 className="ph">
                Project name
                {/* cms: project.name */}
                <div className="spine ph">
                  District, state
                </div>
              </h3>
              <div>
                <p className="ph">
                  One-line impact statement. What this project is for, in a sentence a donor can repeat.
                </p>
                <div className="bar" style={{ maxWidth: "280px" }}>
                  <i />
                </div>
                <p className="small ph">
                  ₹—— raised of ₹—— required
                </p>
              </div>
              <div>
                <Badge variant="on">
                  Active
                </Badge>
              </div>
            </Link>
            {" "}
            <Link className="row" href="/projects/featured">
              <h3 className="ph">
                Project name
                <div className="spine ph">
                  District, state
                </div>
              </h3>
              <div>
                <p className="ph">
                  One-line impact statement.
                </p>
                <div className="bar" style={{ maxWidth: "280px" }}>
                  <i style={{ width: "12%" }} />
                </div>
                <p className="small ph">
                  ₹—— raised of ₹—— required
                </p>
              </div>
              <div>
                <Badge variant="soon">
                  Upcoming
                </Badge>
              </div>
            </Link>
            {" "}
            <Link className="row" href="/projects/featured">
              <h3 className="ph">
                Project name
                <div className="spine ph">
                  District, state
                </div>
              </h3>
              <div>
                <p className="ph">
                  One-line impact statement.
                </p>
                <p className="small">
                  Completed projects publish outcomes against the objectives stated at the start, financial utilisation, and an honest note on what fell short.
                </p>
              </div>
              <div>
                <Badge variant="shut">
                  Completed
                </Badge>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
