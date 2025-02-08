/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#192854',
        'dark-gray':'#515151',
        // gray:'#A7A7A7',
      },
      fontFamily: {
        altivo: ['Altivo', 'sans-serif'],
        archivo: ['Archivo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

