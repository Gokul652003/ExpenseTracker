/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: 'var(--secondary-color)',
        text: 'var(--text-color)',
        randomOne: 'var(--random-color-1)',
        randomTwo: 'var(--random-color-2)',
        randomThree: 'var(--random-color-3)',
        tableBgDark: 'var(--table-bg-dark)',
        border: 'var(--border-color)',
        bg: 'var(--bg-color)',
      },
      fontFamily: {
        primary: 'var(--primary-font)',
      },
    },
  },
  plugins: [],
};
