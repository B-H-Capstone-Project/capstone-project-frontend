/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'md': {'max': '1023px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '375px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      colors: {
        lime: colors.lime,
      },
    },
  },
  purge: ["./src/**/*.tsx"],
}