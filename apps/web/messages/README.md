# Interface strings

`en.json` holds every interface string (navigation, menu, footer, tab bar, labels, notices).
`hi.json` holds the Hindi for the same keys. **It is empty until the Foundation supplies the Hindi
copy** (Agreement cl. 7.1(a), due Week 3). Translation of Client copy is out of scope (cl. 4), so
nothing here is machine-translated or invented.

- A key missing from `hi.json` falls back to the English string (`i18n/request.ts`).
- `npm run i18n:check` lists every key still missing in Hindi. Send that list to the Foundation as
  the copy request. Add `--strict` (used once the Hindi copy arrives) to fail on any gap.
- Page body copy (schemes, articles, projects, site pages) is **not** here: it is record content
  with a per-language publication state (TDD §5.2, §7.1) and moves to the database in pass 2.
- Language names in the switch (हिंदी, हिं, English, EN) are each language's own name, not
  translations, and live in `components/shell/lang-switch.tsx`.
