// Hindi parity report (TDD §5.2): every interface string in en.json should have
// a Hindi counterpart in hi.json.
//   npm run i18n:check            report missing keys (exit 0)
//   npm run i18n:check -- --strict fail on any gap (turn on once Hindi copy arrives)
// Keys in hi.json that English no longer has are always an error.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "messages");
const load = (name) => JSON.parse(readFileSync(join(dir, `${name}.json`), "utf8"));

function flatten(obj, prefix = "", out = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object") flatten(value, path, out);
    else out[path] = value;
  }
  return out;
}

const en = flatten(load("en"));
const hi = flatten(load("hi"));
const missing = Object.keys(en).filter((k) => !(k in hi) || String(hi[k]).trim() === "");
const stale = Object.keys(hi).filter((k) => !(k in en));
const strict = process.argv.includes("--strict");

const total = Object.keys(en).length;
console.log(`Hindi parity: ${total - missing.length} of ${total} interface strings translated.`);
if (missing.length) {
  console.log(`\nMissing in hi.json (${missing.length}), English shown as fallback:`);
  for (const k of missing) console.log(`  ${k}\t${en[k]}`);
}
if (stale.length) {
  console.log(`\nIn hi.json but not in en.json (${stale.length}), remove or rename:`);
  for (const k of stale) console.log(`  ${k}`);
}
process.exitCode = stale.length || (strict && missing.length) ? 1 : 0;
