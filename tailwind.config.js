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
      },
    },
  },
  plugins: [],
};
