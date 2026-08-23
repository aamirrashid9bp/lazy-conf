/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#6365FF',
          green: '#2F6F5E',
        },
        grey: {
          1: '#060611',
          2: '#12121e',
          3: '#1e1e2d',
          text: '#ebebeb',
          muted: '#808080'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inktrap: ['"Area Inktrap"', 'sans-serif'],
        reckless: ['"Reckless Standard M"', 'serif'],
        mono: ['"Martian Mono"', 'monospace'],
      },
      animation: {
        'founders-gradient': 'foundersGradientRotate 4s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'footer-marquee': 'footerMarquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
