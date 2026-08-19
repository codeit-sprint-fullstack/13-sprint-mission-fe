/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "-apple-system", "Arial", "sans-serif"],
      },
      colors: {
        panda: {
          primary: "#3692ff",
          hover: "#1967d6",
          active: "#1251aa",
          hero: "#cfe5ff",
        },
      },
    },
  },
  plugins: [],
};
