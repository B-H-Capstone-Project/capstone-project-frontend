/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
      },
    },
  },
  purge: ["./src/**/*.tsx"],
  Plugin: [require('tailwind-scrollbar-hide')],
}