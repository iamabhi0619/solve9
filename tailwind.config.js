/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik-Regular"],
        regular: ["Rubik-Regular"],
        medium: ["Rubik-Medium"],
        bold: ["Rubik-Bold"],
      },
      colors: {
        light: {
          background: "#F4F7FB",
          surface: "#FFFFFF",
          border: "#D9E1F0",

          primary: "#1C4D8D",
          primarySoft: "#4988C4",
          focus: "#BDE8F5",

          textPrimary: "#0F2854",
          textSecondary: "#4A628A",
          error: "#D64545",
        },
        dark: {
          background: "#161A22",
          surface: "#1D2230",
          border: "#2A3142",

          primary: "#5B8CFF",
          primarySoft: "#7FA7FF",
          focus: "#8FB6FF",

          textPrimary: "#E6EAF2",
          textSecondary: "#AAB2C5",
          error: "#FF6B6B",
        },
      },
    },
  },
  plugins: [],
};
