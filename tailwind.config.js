module.exports = {
  content: [
    "./index.html", // or wherever your HTML files are located
    "./src/**/*.{js,ts,jsx,tsx}", // or wherever your JS/TS/JSX/TSX files are located
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubik-80s': ['"Rubik 80s Fade"', 'sans-serif'], // Adding the custom font

      },
      
    },
  },
  plugins: [],
};

