module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        secondary: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#2EBAC1",
        secondary: "#A4D96C",
        gray: {
          light: "#C4C4C4",
          dark: "#292D32",
          light6B: "#6b6b6b",
          darkF3: "#f3edff",
        },
        red: {
          dark: "#820005",
          light: "#f8d7da",
        },
        tertiary: "#3A1097",
      },
    },
  },
  plugins: [],
};
