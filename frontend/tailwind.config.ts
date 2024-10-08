import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
      },
      lineHeight: {
        extratight: '1.15',
      },
      boxShadow: {
        'inner-blur':
          'inset -0.5px 0.5px 1px 0px rgba(80, 131, 186, 0.12), inset 0 0 96px 0 rgba(80, 131, 186, 0.08)',
        'inner-blur-light':
          'inset -0.5px 0.5px 1px 0px rgba(80, 131, 186, 0.01), inset 0 0 96px 0 rgba(80, 131, 186, 0.08)',
        'inner-blur-no-border': 'inset 0 0 96px 0 rgba(80, 131, 186, 0.01)',
        'btn-primary':
          'inset 0px 1px 0px 0px rgba(255, 255, 255, 0.1), inset 0px 0px 12px 0px rgba(255, 255, 255, 0.08), inset 0px -8px 32px 0px rgba(80, 186, 82, 0.5), 0px 0px 0px 1px rgba(255, 255, 255, 0.2), 0px 1px 3px 0px rgba(80, 186, 82, 0.4), 0px 1px 0px 0px rgba(80, 186, 82, 0.2), 0px 4px 25px 1px rgba(186, 135, 80, 0.5)',
        'btn-primary-hover':
          'inset 0px 1px 0px 0px rgba(255, 255, 255, 0.1), inset 0px 0px 12px 0px rgba(255, 255, 255, 0.08), inset 0px -8px 32px 0px rgba(80, 186, 82, 0.5), 0px 0px 0px 1px rgba(255, 255, 255, 0.2), 0px 1px 3px 0px rgba(80, 186, 82, 0.4), 0px 1px 0px 0px rgba(80, 186, 82, 0.2), 0px 4px 50px 3px rgba(250, 135, 22, 0.1)',
        'btn-secondary':
          'inset 0px 1px 0px 0px rgba(255, 255, 255, 0.1), inset 0px 0px 12px 0px rgba(255, 255, 255, 0.08), inset 0px -8px 32px 0px rgba(80, 186, 82, 0.2), inset -0.5px 0.5px 1px 0px rgba(80, 131, 186, 0.12), inset 0 0 96px 0 rgba(80, 131, 186, 0.05), 0px 0px 0px 1px rgba(255, 255, 255, 0.2), 0px 1px 0px 0px rgba(255, 255, 255, 0.2)',
        'btn-secondary-hover': 'inset 0px 0px 12px 8px rgba(80, 131, 186, 0.04)',
      },
      backgroundImage: {
        'btn-primary':
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(243, 238, 255, 0.4)), linear-gradient(to bottom, rgba(80, 186, 82, 1), rgba(80, 186, 82, 1))',
        'btn-primary-hover':
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(243, 238, 255, 0.25)), linear-gradient(to bottom, rgba(250, 135, 22, 1), rgba(250, 135, 22, 1))',
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
