import type { Config } from "tailwindcss";

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
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
    },
  },
  plugins: [],
};
export default config;
