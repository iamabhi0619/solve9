/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik-Regular"],
        regular: ["Rubik-Regular"],
        medium: ["Rubik-Medium"],
        bold: ["Rubik-Bold"],
      },
      colors: {
        darkblue: "#0F2854",
        regularblue: "#1C4D8D",
        lightblue: "#4988C4",
        cyan: "#BDE8F5",
      },
    },
  },
  plugins: [],
}