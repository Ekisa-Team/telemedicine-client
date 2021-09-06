module.exports = {
  purge: ['./src/**/*.svelte'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['Oswald', 'sans-serif'],
      body: ['Poppins', 'sans-serif']
    },
    container: {
      center: true,
      padding: '1.5rem'
    },
    extends: {
      color: {
        inherit: 'inherit',
        transparent: 'transparent',
        current: 'currentColor'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
