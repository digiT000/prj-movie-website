import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["items-grid"],
  // theme: {
  //   extend: {
  //     colors: {
  //       background: "var(--background)",
  //       foreground: "var(--foreground)",
  //     },
  //   },
  // },
  theme: {
    colors: {
      transparent: "transparent",
      pure_white: "#ffffff",
      red: "#FC4747",
      soft_red: "#D85252",
      dark_blue: "#10141E",
      greyish_blue: "#5A698F",
      semi_dark_blue: "#161D2F",
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "heading-L": "2rem",
      "heading-M": "1.5rem",
      "heading-S": "1.5rem",
      "heading-XS": "1.125rem",
      "body-M": "0.938rem",
      "body-S": "0.813rem",
    },
    fontFamily: {
      sans: ["var(--font-outfit)"],
      mono: ["var(--font-roboto-mono)"],
    },
  },
  plugins: [],
} satisfies Config;
