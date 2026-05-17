import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "../../packages/shared/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "hsl(var(--background) / <alpha-value>)",
          100: "hsl(var(--surface) / <alpha-value>)",
          200: "hsl(var(--surface-strong) / <alpha-value>)",
          300: "hsl(var(--border) / <alpha-value>)",
          700: "hsl(var(--foreground) / <alpha-value>)"
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(59, 46, 32, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;

