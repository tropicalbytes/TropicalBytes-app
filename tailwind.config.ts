import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F8F3EA",
        forest: {
          DEFAULT: "#1F3A2E",
          light: "#2E5342",
          dark: "#132920",
        },
        copper: {
          DEFAULT: "#C1694F",
          light: "#D98A6E",
          dark: "#9C4E38",
        },
        ink: "#1C1917",
        sand: "#EFE6D6",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(31, 58, 46, 0.25)",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};
export default config;
