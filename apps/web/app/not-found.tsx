import Link from "next/link";

// Fallback for requests outside a locale (the middleware normally prefixes
// every address with /en or /hi, so this is rarely reached).
export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "48px 24px" }}>
        <h1>Page not found</h1>
        <p>
          <Link href="/en">Go to the home page</Link>
        </p>
      </body>
    </html>
  );
}
