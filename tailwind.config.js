/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans], // Add Montserrat
      },
      colors: {
        'brand-primary': '#04515E', // Example of adding the color to theme
        'brand-primary-hover': '#03414b',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Add scrollbar plugin
  ],
};
