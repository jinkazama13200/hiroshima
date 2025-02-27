import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: {
          default: colors.green[400],
          hover: colors.green[500],
        },
      },
    },
  },
  plugins: [require("rippleui")],

  /** @type {import('rippleui').Config} */
  rippleui: {
    removeThemes: ["dark"],
    themes: [
      {
        themeName: "light",
        colorScheme: "light",
        colors: {
          secondary: colors.green[400],
        },
      },
    ],
  },
};
