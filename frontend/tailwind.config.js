/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-1': '#B57AFF',
        'background-2': '#FAF3F1',
        'background-3': '#F3EAFF',
        'background-4': '#FFE0CA',
      },
      fontFamily: {
        header: ['Poppins', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
