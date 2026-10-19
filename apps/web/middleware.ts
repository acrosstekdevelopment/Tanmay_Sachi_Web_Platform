import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Adds the locale prefix: "/" → "/en", "/work" → "/en/work".
export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API routes and files with an extension (icons, brand assets).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
