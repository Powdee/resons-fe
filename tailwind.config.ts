import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-mode="dark"]'],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/domains/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#101010",
        secondary: "#FFFFFF",
        input: "#404040",
      },
    },
  },
  plugins: [],
};
export default config;
