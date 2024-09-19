/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightpurple: '#f5ebff',
        lightmedpurple: '#eae4ff',
        medpurple: '#dddeff',
        meddarkpurple: '#ccd8ff',
        darkpurple: '#b9c9fb',
        lightyellow: '#FFDAB9'
      },
    },
  },
  plugins: [],
};
