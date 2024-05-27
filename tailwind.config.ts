import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C5DFA",
        "primary-light": "#9277FF",
        "dark-light": "#1E2139",
        "dark-medium": "#252945",
        "gray-light": "#DFE3FA",
        "gray-medium": "#888EB0",
        "blue-gray": "#7E88C3",
        "blue-gray-light": "#777f98",
        "dark-darkest": "#0C0E16",
        "red-medium": "#EC5757",
        "red-light": "#9277FF",
        light: "#F8F8FB",
        dark: "#141625",
      },
    },
  },
  plugins: [],
};
export default config;
