import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: '#f1b722',
        foreground: "var(--foreground)",
      },

      fontFamily: {
        catamaran: ["Catamaran", "sans-serif"],
        logoText: ["Sevillana", "serif"]
      },
    },
  },
  plugins: [],
};
export default config;
