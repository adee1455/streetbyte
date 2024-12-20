/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {

        'Proxima': ['Proxima', 'sans-serif'],
        'ProximaBold' : ['ProximaBold', 'sans-serif'] 
      }
    },
  },
  plugins: [],
};
