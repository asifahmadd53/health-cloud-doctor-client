/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        dark: '#2C415C',
        primary: '#2C415C',
        secondary: '#2895cb',
        white: '#f9f9f9',
        black: '#05091d',
      },
      screens: {
        xs: {max: '375px'}, // Small phones (iPhone SE, Pixel 4a)
        sm: '376px', // Regular phones (iPhone 12, Galaxy S21)
        md: '450px', // Large phones (iPhone 13 Pro Max, Galaxy S22 Ultra)
        lg: '768px', // Small tablets (iPad Mini, foldable devices)
        xl: '1024px', // Large tablets (iPad Pro, Surface Duo)
      },
    },
  },
  plugins: [],
};
