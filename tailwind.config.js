/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cake: {
          primary: '#E85B91',
          light: '#FFF0F5',
          dark: '#C83E73',
          cream: '#FFF9F3',
          chocolate: '#70452F',
          text: '#63384B',
          muted: '#966D7D',
          border: '#F3D2DF',
          accent: '#FF75A0',
          yellow: '#FDE047',
          mint: '#A7F3D0',
          lavender: '#E9D5FF'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Quicksand"', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'cake-soft': '0 8px 30px rgba(232, 91, 145, 0.12)',
        'cake-hover': '0 12px 35px rgba(232, 91, 145, 0.22)',
        'cake-inner': 'inset 0 2px 4px rgba(99, 56, 75, 0.06)',
      },
      backgroundImage: {
        'gingham-pattern': "repeating-linear-gradient(0deg, rgba(232,91,145,0.06) 0px, rgba(232,91,145,0.06) 24px, transparent 24px, transparent 48px), repeating-linear-gradient(90deg, rgba(232,91,145,0.06) 0px, rgba(232,91,145,0.06) 24px, transparent 24px, transparent 48px)",
      }
    },
  },
  plugins: [],
}
