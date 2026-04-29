/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#333333',
          300: '#262626',
          500: '#1a1a1a',
          700: '#0d0d0d',
        },
        light: {
          100: '#ffffff',
          900: '#e6e6e6',
        },
        primary: {
          500: '#3b82f6',
        },
        danger: {
          500: '#ef4444',
        },
      },
      borderRadius: {
        '2': '2px',
      },
    },
  },
  plugins: [],
}