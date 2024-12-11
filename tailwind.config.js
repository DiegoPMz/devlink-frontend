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

        "bg-color-primary": "var(--bg-color-primary)"  ,
        "bg-color-secondary": "var(--bg-color-secondary)",

        "txt-color-primary": "var(--txt-color-primary)"  ,
        "txt-color-secondary": "var(--txt-color-secondary)",

        "accent-primary-color": "var(--accent-primary-color)",
        "accent-p-contrast-color" : "var(--accent-p-contrast-color)",
        "accent-primary-color-h": "var(--accent-primary-color-h)",
        
        "accent-secondary-color": "var(--accent-secondary-color)",
        "accent-s-contrast-color" : "var(--accent-s-contrast-color)",
   
        "error-primary-color": "var(--error-primary-color)",
        "ui-border-color": "var(--ui-border-color)"
      },
      boxShadow: {
        app: " 0 2px 25px var(--accent-primary-color)",
        appError: " 0 2px 25px var(--error-primary-color)",
      },
      transitionTimingFunction: {
        "custom-ease": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};
