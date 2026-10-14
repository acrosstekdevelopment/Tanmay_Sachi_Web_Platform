import type { Config } from "tailwindcss";

// Colours mirror the Approved Design :root tokens exactly (BUILD_GUIDE §2).
// Preflight is disabled: the mockup was designed on browser defaults plus its
// own small reset (app/styles/mockup.css), and Tailwind's reset changes button,
// input and placeholder rendering.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    // The mockup switches to its mobile layout below 820px (its own
    // `innerWidth < 820` rule), so `md:` means "web layout".
    screens: {
      sm: "480px",
      md: "820px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        paper: "#FBF9F6",
        "paper-alt": "#F2EEE8",
        "paper-deep": "#EAE4DB",
        ink: "#16181A",
        "ink-70": "#4A4F55",
        "ink-50": "#5F656C",
        rule: "#E2DCD5",
        "rule-strong": "#CFC7BC",
        coral: "#E8462E",
        "coral-ink": "#C6321F",
        "coral-deep": "#BE2E1C",
        "coral-wash": "#FDF0ED",
        ok: "#1B5E20",
        warn: "#8A5A00",
        focus: "#0B57D0",
      },
      fontFamily: {
        serif: ["var(--serif)"],
        sans: ["var(--sans)"],
      },
      borderRadius: {
        DEFAULT: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
