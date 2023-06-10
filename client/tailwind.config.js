/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      colors: {
        'text': '#636370',
        'heading': '#33333d',
        'hr': '#dddde7',
        'layer-1': '#f6f6fa',
        'layer-2': '#fff',
        'layer-3': '#f6f6fa',
        'muted-1': '#efeff3',
        'muted-2': '#e1e1ea',
        'muted-3': '#dddde7',
        'primary': '#2563eb',
        'primary-accent': '#1e40af',
        'secondary': '#626270',
        'secondary-accent': '#51515f',
        'critical': '#dc2626',
        'critical-accent': '#991b1b',
      },
    },
  },

  plugins: [],
}

