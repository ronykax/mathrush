import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      bgcolor: "#181821",
      default: "#292935",
      hover: "#252530",
      primary: "#FFFFFF",
      secondary: "#DDDDDD",
      black: "#000000"
    }
  },
  plugins: [],
}

export default config;