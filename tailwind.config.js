/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    minWidth: {
      '1/2': '50%',
      '1/4': '25%',
      40: '10rem',
      60: '15rem',
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-16deg)',
          },
          '50%': {
            transform: 'rotate(16deg)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        wigglefast: 'wiggle 200ms ease-in-out infinite',
      },
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    screens: {
      xl: { min: '1200px' },
      lg: { min: '992px' },
      md: { min: '768px' },
      sm: { min: '576px' },
      xs: { min: '480px' },
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      large: '12px',
      xl: '26px',
    },
  },
  plugins: [],
}
