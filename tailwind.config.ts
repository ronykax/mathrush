import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      bgcolor: "#111111",
      primary: "#FFFFFF",
      secondary: "#CDCDCD",
      default: "#1e1e1e",
      hover: "#2c2c2c"
    }
  },
  plugins: [require("@tailwindcss/forms")],
}

export default config;