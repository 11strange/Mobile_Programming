/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#0e0e0e',
        surface: '#0e0e0e',
        'surface-container-low': '#131313',
        'surface-container': '#1a1a1a',
        'surface-container-high': '#20201f',
        'surface-container-highest': '#262626',
        primary: '#d1ff26',
        'primary-container': '#cefc22',
        'on-primary': '#526700',
        'on-surface': '#ffffff',
        'on-surface-variant': '#adaaaa',
      },
    },
  },
  plugins: [],
};
