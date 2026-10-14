import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

// Device floor (Agreement cl. 3.1): Android 7+, iOS 14+. Block APIs that the
// floor lacks unless a polyfill is added and documented in COMPATIBILITY.md.
const floorBreakingSyntax = [
  {
    selector: "CallExpression[callee.name='structuredClone']",
    message: "structuredClone is missing on the Android 7 / iOS 14 floor.",
  },
  {
    selector: "CallExpression[callee.property.name='at']",
    message: "Array/String.prototype.at is missing on the Android 7 / iOS 14 floor.",
  },
  {
    selector: "CallExpression[callee.object.name='Object'][callee.property.name='hasOwn']",
    message: "Object.hasOwn is missing on the Android 7 / iOS 14 floor.",
  },
  {
    selector: "CallExpression[callee.property.name='replaceAll']",
    message: "String.prototype.replaceAll is missing on the Android 7 floor.",
  },
];

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "playwright-report/**", "test-results/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": ["error", ...floorBreakingSyntax],
    },
  },
];

export default eslintConfig;
