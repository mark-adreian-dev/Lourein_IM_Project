/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",

  ],
  theme: {
    extend: {
      backgroundImage: {
        'topology': "url('./src/assets/background.jpg')",
      },
    },
  },
  plugins: [
    require('daisyui'),

  ],
  daisyui: {
    themes: ["black"]
  }
}