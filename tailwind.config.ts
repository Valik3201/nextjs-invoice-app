import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
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
        orange: "#FF8F00",
        green: "#33D69F",
        "red-medium": "#EC5757",
        "red-light": "#FF9797",
        light: "#F8F8FB",
        dark: "#141625",
        facebook: "#0866ff",
      },
      fontSize: {
        "heading-l": [
          "36px",
          {
            lineHeight: "33px",
            letterSpacing: "-1px",
            fontWeight: "bold",
          },
        ],
        "heading-m": [
          "24px",
          {
            lineHeight: "22px",
            letterSpacing: "-0.75px",
            fontWeight: "bold",
          },
        ],
        "heading-s": [
          "15px",
          {
            lineHeight: "24px",
            letterSpacing: "-0.25px",
            fontWeight: "bold",
          },
        ],
        "heading-s-variant": [
          "15px",
          {
            lineHeight: "15px",
            letterSpacing: "-0.25px",
            fontWeight: "bold",
          },
        ],
        body: [
          "13px",
          {
            lineHeight: "18px",
            letterSpacing: "-0.1px",
            fontWeight: "500",
          },
        ],
        "body-variant": [
          "13px",
          {
            lineHeight: "15px",
            letterSpacing: "-0.25px",
            fontWeight: "500",
          },
        ],
        error: [
          "10px",
          {
            lineHeight: "15px",
            letterSpacing: "-0.21px",
            fontWeight: "500",
          },
        ],
      },
      boxShadow: {
        item: "0 10px 10px -10px rgba(72, 84, 159, 0.1)",
        "filter-light": "0 10px 20px 0 rgba(72, 84, 159, 0.25)",
        "filter-dark": "0 10px 20px 0 rgba(0, 0, 0, 0.25)",
      },
    },
  },
};
export default config;
