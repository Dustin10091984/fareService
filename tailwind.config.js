/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      xs: "1.4rem",
      sm: "1.8rem",
      base: "2.0rem",
      lg: "2.2rem",
      xl: "2.4rem",
      "2xl": "3.0rem",
      "3xl": "3.6rem",
      "4xl": "4.8rem",
      "5xl": "6.0rem",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0068e1",
          main: "#0068e1",
          light: "#EBF4FF",
          dark: "#3B5998",
        },
      },

      screens: {
        xl: "1200px",
      },
    },
  },
  plugins: [],
};
