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
      },
    },
  },
  plugins: [],
};
