/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        flashWhite: "#F8F8F8",
        selectedBlue: "#0b213f",
        lightBlue: '#93C5FD'
      },
    },
  },
  plugins: [],
};
