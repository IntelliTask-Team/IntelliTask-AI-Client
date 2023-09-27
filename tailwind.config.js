/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['"Lexend"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        jaune: "#d79731",
        vert: "#365f4a",
        beige: "#f7f4ed",
        sapin: "#274536",
        rouge: "#d75731",
      },
    },
  },
  plugins: [],
};
