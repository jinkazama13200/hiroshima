import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
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
  plugins: [],
};
