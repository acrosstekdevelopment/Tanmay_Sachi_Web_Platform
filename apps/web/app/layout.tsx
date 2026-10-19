// The real root layout is app/[locale]/layout.tsx, which sets <html lang>.
// This pass-through exists so app/not-found.tsx can render outside a locale.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
