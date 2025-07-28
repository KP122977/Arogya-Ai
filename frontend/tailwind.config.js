/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
   extend: {
  animation: {
    'fade-in': 'fadeIn 0.5s ease-out',
  },
   fontFamily: {
    sans: ['"Poppins"', 'sans-serif'], // or your preferred font
  },
  keyframes: {

    
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
  },
}
  },
  plugins: [],
}

