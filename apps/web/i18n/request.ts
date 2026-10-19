import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import en from "../messages/en.json";
import { routing } from "./routing";

type Messages = { [key: string]: string | Messages };

/** Hindi strings win where they exist; any key not yet translated falls back to English. */
function withFallback(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const current = out[key];
    out[key] =
      typeof value === "object" && typeof current === "object" ? withFallback(current, value) : value;
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const messages =
    locale === "en"
      ? en
      : withFallback(en, (await import(`../messages/${locale}.json`)).default as Messages);
  return { locale, messages };
});
