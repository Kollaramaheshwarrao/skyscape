/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'script': ['Dancing Script', 'cursive'],
      },
      colors: {
        dawn: {
          peach: '#FFB5A7',
          lavender: '#C8A2C8'
        },
        day: {
          cerulean: '#007BA7',
          warm: '#FFD700'
        },
        evening: {
          amber: '#FFBF00',
          violet: '#8B00FF'
        },
        night: {
          navy: '#1E3A8A',
          star: '#F8F8FF'
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'drift': 'drift 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(20px)' },
        }
      }
    },
  },
  plugins: [],
}