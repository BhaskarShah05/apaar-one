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
          950: "#071321",
          900: "#0B1F33", // Dark Navy
          800: "#102A43", // Primary Navy
          700: "#1E3A5F",
          600: "#2B4C7E",
          100: "#E2E8F0",
          50: "#F0F4F8",
        },
        govblue: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          500: "#3B82F6",
          600: "#2563EB", // Primary Blue
          700: "#1D4ED8",
        },
        govteal: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          500: "#14B8A6",
          600: "#0D9488", // Success / Verified Teal
          700: "#0F766E",
        },
        slatebg: "#F7F9FC",
        textMain: "#172B4D",
        textMuted: "#64748B",
        borderLine: "#E2E8F0",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        card: "0 4px 6px -1px rgba(16, 42, 67, 0.05), 0 2px 4px -1px rgba(16, 42, 67, 0.03)",
        elevated: "0 10px 15px -3px rgba(16, 42, 67, 0.07), 0 4px 6px -2px rgba(16, 42, 67, 0.03)",
      },
    },
  },
  plugins: [],
};
export default config;

