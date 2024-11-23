/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // primary: "#4A90E2",
        // secondary: "#F5A623",
        // accent: "#37cdbe",
        // neutral: "#3d4451",        
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: "#4A90E2",
          "primary-content": "#FFFFFF",
          secondary: "#F5A623",      
        },
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          primary: "#4A90E2",
          "primary-content": "#FFFFFF",
          secondary: "#F5A623",
        },
      },
    ],
  },
}

// BKUP of existing WORKING code lol
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
//   ],
//   darkMode: ["class", '[data-theme="dark"]'],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#4A90E2",
//         secondary: "#F5A623",
//         accent: "#37cdbe",
//         neutral: "#3d4451",        
//       },
//     },
//   },
//   plugins: [require("@tailwindcss/typography"), require("daisyui")],
//   daisyui: {
//     themes: ["light", "dark"],
//   },

// }
