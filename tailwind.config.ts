import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      lightdarkgray: "#262626",
      darkgray: "#1e1e1e",
      normalgray: "#4A4A4A",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;