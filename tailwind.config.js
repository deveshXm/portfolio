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
      colors:{
        pink: '#d7387e',
        lightblue: '#46eafb',
        grey: '#1f1e1f'
      }
    },
    fontFamily: {
      roboto: ["Roboto Mono", "monospace"],
      poppins: ['Poppins', 'sans-serif']
    },
  },
  plugins: [],
};
