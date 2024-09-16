/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    fontFamily: {
      'abel': ['Abel', 'sans-serif'],
      'quicksand': ['Quicksand', 'sans-serif'],
      'typeMono': ["Sometype Mono", 'monospace']
    },
    extend: {
      colors: {
        'card': '#ECECEC',
      },
      backgroundImage: {
        'header-gradient': 'linear-gradient(to bottom, #C6C8C6 100%, #000000 100%)',
        'primary-gradient': 'linear-gradient(0deg, #1E4A28 0%, #1E4A28 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.60) 0%, rgba(255, 255, 255, 0) 100%)',
        'secondary-gradient': 'linear-gradient(0deg, #D8F992 0%, #D8F992 100%)',
        'grey-gradient': 'linear-gradient(308deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.50) 100%), #B0B0B0',
        'primary-seconed-gradient': 'linear-gradient(0deg, #1E4A28 0%, #1E4A28 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.60) 0%, rgba(255, 255, 255, 0) 100%)',

      },
    },

  },
  plugins: [],
}

