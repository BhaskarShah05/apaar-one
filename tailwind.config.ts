import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#09090b", // zinc-950 dark base
          900: "#121215",
          800: "#18181b", // zinc-900 surface
          700: "#27272a", // zinc-800 border
          600: "#3f3f46",
          100: "#27272a",
          50: "#18181b",
        },
        govblue: {
          50: "rgba(59, 130, 246, 0.1)",
          100: "rgba(59, 130, 246, 0.15)",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        govteal: {
          50: "rgba(16, 185, 129, 0.1)",
          100: "rgba(16, 185, 129, 0.2)",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
        slatebg: "#09090b",
        textMain: "#f4f4f5",
        textMuted: "#a1a1aa",
        borderLine: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)",
        elevated: "0 10px 25px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
