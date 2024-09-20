import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme')


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      colors: {
        'orange-tiger': '#FA7416',
        'moss-landing': '#6B793E',
        'black-rooster': '#2D160E',
        'dust': '#B39770',
        'white-heat': '#FEFDF7',
        'white-as-heaven': '#FFFFFF',
        lightBackground: '#FEFDF7', // Color de fondo claro
        white: '#FFFFFF', // Blanco puro
        accentGold: '#B39770', // Color dorado suave
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'btn-primary':
        'linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(243, 238, 255, 0.4)), linear-gradient(to bottom, rgba(179, 151, 112, 1), rgba(81, 54, 144, 1))',
      'btn-primary-hover':
        'linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(243, 238, 255, 0.25)), linear-gradient(to bottom, rgba(179, 151, 112, 1), rgba(81, 54, 144, 1))',
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'], // Tipografía para los títulos
        quicksand: ['Quicksand', 'sans-serif'], // Para los H1, H2, H3
        inter: ['Inter', 'sans-serif'], // Para los párrafos
      },
      fontSize: {
        'h1': ['34px', '40px'],   // Titular H1
        'h2': ['32px', '38px'],   // Titular H2
        'h3': ['18px', '24px'],   // Titular H3
        'paragraph': ['16px', '22px'], // Párrafo
      },
      lineHeight: {
        extratight: '1.15',
      },

      boxShadow: {
        'inner-blur':
          'inset -0.5px 0.5px 1px 0px rgba(203, 213, 225, 0.12), inset 0 0 96px 0 rgba(221, 214, 254, .08)',
        'inner-blur-light':
          'inset -0.5px 0.5px 1px 0px rgba(203, 213, 225, 0.01), inset 0 0 96px 0 rgba(221, 214, 254, .08)',
        'inner-blur-no-border': 'inset 0 0 96px 0 rgba(221, 214, 254, .01)',
        'btn-primary':
          'inset 0px 1px 0px 0px rgba(255, 255, 255, 0.1), inset 0px 0px 12px 0px rgba(255, 255, 255, 0.08), inset 0px -8px 32px 0px rgba(30, 13, 73, 0.5), 0px 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 1px 3px 0px rgba(0, 0, 0, 0.4), 0px 1px 0px 0px rgba(0, 0, 0, 0.2), 0px 4px 25px 1px rgba(179, 151, 112, 0.5)',
        'btn-primary-hover':
          'inset 0px 1px 0px 0px rgba(255, 255, 255, 0.1), inset 0px 0px 12px 0px rgba(255, 255, 255, 0.08), inset 0px -8px 32px 0px rgba(30, 13, 73, 0.5), 0px 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 1px 3px 0px rgba(0, 0, 0, 0.4), 0px 1px 0px 0px rgba(0, 0, 0, 0.2), 0px 4px 50px 3px rgba(254, 253, 247, 0.1)',
        'btn-secondary':
          'inset 0px 1px 0px 0px rgba(255, 255, 255, 0.1), inset 0px 0px 12px 0px rgba(255, 255, 255, 0.08), inset 0px -8px 32px 0px rgba(30, 13, 73, 0.2), inset -0.5px 0.5px 1px 0px rgba(203, 213, 225, 0.12), inset 0 0 96px 0 rgba(221, 214, 254, .05), 0px 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 1px 0px 0px rgba(0, 0, 0, 0.2)',
        'btn-secondary-hover':
          'inset 0px 0px 12px 8px rgba(255, 255, 255, 0.04)',
      },

      margin: {
        18: '4.5rem',
      },

      spacing: {
        4.5: '1.125rem',
      },

      blur: {
        '4xl': '200px',
      },

      keyframes: {
        infiniteScroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },

      animation: {
        infiniteScroll:
          'infiniteScroll var(--_infinite-scroll-duration, 40s) linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
