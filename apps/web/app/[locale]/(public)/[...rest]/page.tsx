import { notFound } from "next/navigation";

// Any unknown address under a locale renders the not-found page inside the site shell.
export default function CatchAll() {
  notFound();
}
