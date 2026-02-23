/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#c8102e",
          ink: "#111111",
          soft: "#f6f6f6"
        }
      },
      boxShadow: {
        card: "0 10px 35px rgba(17,17,17,0.08)"
      },
      maxWidth: {
        "8xl": "88rem"
      }
    }
  },
  plugins: []
};
