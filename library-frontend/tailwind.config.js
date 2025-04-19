/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
    },
    extend: {
      colors: {
        'custom-dark': '#11101D',
        white: '#ffffff',
        blue: {
          600: '#2563EB',
        },
      },
    },
  },
  plugins: [],
};