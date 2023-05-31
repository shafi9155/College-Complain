/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    
  ],
  theme: {
    extend: {
      colors:{
        'custom-grey':"rgb(217,222,229)",
         'custom-blue':"#111827"
      }
    },
  },
  plugins: [ ],
}
