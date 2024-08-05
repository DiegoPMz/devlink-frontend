/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Instrument Sans", "sans-serif"],
      },

      colors: {
        appPurple: "#633CFF",
        appPurpleH: "#BEADFF",
        appPurpleL: "#EFEBFF",
        appGrey: "#737373",
        appGreyD: "#333333",
        appGreyL: "#FAFAFA",
        appBorder: "#D9D9D9",
        appRed: "#FF3939",
      },
      boxShadow: {
        app: " 0 2px 25px rgba(99,60,255,0.5)",
      },
      transitionTimingFunction: {
        "custom-ease": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};
