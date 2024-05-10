/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#14B8A6',
        'primary-light': '#99F6E4',
        'primary-dark': '#0F766E',
        'light': '#A8A29E',
        'dark': '#1C1917',
        'dark-2': '#44403C',
        'white-2': '#EEF2F5'
      },
    },
  },
  plugins: [],
}