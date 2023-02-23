/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "light-step": "0px 0px 10px 2px #e5e5e5",
        "light-stepIn": "inset 0px 0px 5px 1px #e5e5e5",
      },
      gridTemplateColumns: {
        "auto-2x": "repeat(auto-fit,250px)",
        "auto-1x": "repeat(auto-fit,200px)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
