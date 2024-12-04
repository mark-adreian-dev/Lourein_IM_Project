const { default: daisyui } = require('daisyui');

module.exports = {
  content: [
    "./views/department/*.ejs",
    "./views/employee/*.ejs",
    "./views/projects/*.ejs",
    "./views/task/*.ejs",
    "./views/partials/*.ejs",
    "./views/*.ejs",
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],

  daisyui: {
    themes: ["coffee"]
  }
}

