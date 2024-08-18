/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-1': '#B57AFF', // Dark Purple
        'background-2': '#FAF3F1', // Light Pink
        'background-3': '#F3EAFF', // Light Purple
        'background-4': '#FFE0CA', // Light Orange
        'background-5': '#FAF3F1', // Off-white
        'text-1': '#1A1A1A', // Black
      },
      fontFamily: {
        header: ['Poppins', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
