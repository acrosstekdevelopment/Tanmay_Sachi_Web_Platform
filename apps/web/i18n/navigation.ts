import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware replacements for next/link and next/navigation. Links written
// as "/work" stay in the visitor's current language (/en/work or /hi/work).
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
