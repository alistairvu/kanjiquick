/** @type {import('tailwindcss').Config} */
export default {
  content: ['./templates/**/*.jinja', './static/src/**/*.js'],
  theme: {
    extend: {},
  },
  rippleui: {
    removeThemes: ['dark'],
  },
  plugins: [require('rippleui')],
};
