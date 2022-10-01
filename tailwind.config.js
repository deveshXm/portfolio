/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
    },
    fontFamily: {
      roboto: ["Roboto Mono", "monospace"],
      poppins: ['Poppins', 'sans-serif']
    },
  },
  plugins: [],
};
