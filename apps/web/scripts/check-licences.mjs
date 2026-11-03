// Licence gate (TDD §12, §14.2): production dependencies must carry a permissive
// licence. Walks the installed production dependency tree of the web app and
// fails on anything outside the allow-list, or with no declared licence.
//
//   npm run licences:check
//
// Add to ALLOWED_NOTES only after reading the licence; say why.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ALLOWED = new Set([
  "MIT", "MIT-0", "ISC", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "0BSD", "BlueOak-1.0.0",
  "CC0-1.0", "CC-BY-4.0", "Unlicense", "Python-2.0", "OFL-1.1", "Zlib",
]);

// Reviewed exceptions: name prefix -> reason.
const ALLOWED_NOTES = {
  // Prebuilt libvips binaries that sharp (optional, used by next/image, which this site sets to
  // unoptimized) may download. LGPL applies to the shared library, linked dynamically, not to our code.
  "@img/sharp-libvips-": "LGPL-3.0-or-later, dynamically linked libvips used by optional sharp",
};

const root = execFileSync("npm", ["root"], { encoding: "utf8", shell: process.platform === "win32" }).trim();
const tree = JSON.parse(
  execFileSync("npm", ["ls", "--omit=dev", "--all", "--json", "--long"], {
    encoding: "utf8",
    shell: process.platform === "win32",
    maxBuffer: 64 * 1024 * 1024,
  }),
);

const seen = new Map();
(function walk(node) {
  for (const [name, dep] of Object.entries(node.dependencies ?? {})) {
    if (dep.path && !seen.has(dep.path)) {
      seen.set(dep.path, { name, version: dep.version, path: dep.path });
      walk(dep);
    }
  }
})(tree);

const bad = [];
for (const { name, version, path } of seen.values()) {
  const pj = join(path, "package.json");
  if (name.startsWith("@tanmaysaachi/")) continue; // our own private workspace packages
  if (!existsSync(pj)) continue; // optional platform binary not installed on this machine
  const meta = JSON.parse(readFileSync(pj, "utf8"));
  const raw = meta.license ?? meta.licenses ?? null;
  const text = typeof raw === "string" ? raw : Array.isArray(raw) ? raw.map((l) => l.type).join(" OR ") : raw?.type ?? "";
  const ids = text.replace(/[()]/g, "").split(/\s+(?:OR|AND)\s+/i).filter(Boolean);
  const ok = ids.length > 0 && ids.some((id) => ALLOWED.has(id));
  const note = Object.keys(ALLOWED_NOTES).some((p) => name.startsWith(p));
  if (!ok && !note) bad.push(`${name}@${version}: ${text || "(no licence declared)"}`);
}

console.log(`checked ${seen.size} production packages under ${root}`);
if (bad.length) {
  console.error("Packages outside the permissive allow-list:\n  " + bad.join("\n  "));
  process.exit(1);
}
console.log("all production dependencies are permissively licensed");
