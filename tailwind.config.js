module.exports = {
  mode:'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'beige': '#F0EDDF',
        'blackish':'#242424'
      },
      fontFamily:{
        arimo:"'Arimo', sans-serif",
        acme:"'Acme', sans-serif",
        lato:"'Lato', sans-serif",
        skranji:"'Skranji', cursive"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
