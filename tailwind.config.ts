import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      spacing: {
        '0': '0px',
        '1': '0.0625rem',
        '2': '0.125rem',
        '4': '0.25rem',
        '6': '0.375rem',
        '8': '0.5rem',
        '10': '0.625rem',
        '12': '0.75rem',
        '14': '0.875rem',
        '16': '1rem',
        '20': '1.25rem',
        '24': '1.5rem',
        '28': '1.75rem',
        '32': '2rem',
        '36': '2.25rem',
        '40': '2.5rem',
        '44': '2.75rem',
        '48': '3rem',
        '56': '3.5rem',
        '64': '4rem',
        '80': '5rem',
        '96': '6rem',
      },
      fontSize: {
        h1: ['36px', { lineHeight: '44px' }],
        h2: ['32px', { lineHeight: '40px' }],
        h3: ['28px', { lineHeight: '36px' }],
        h4: ['24px', { lineHeight: '32px' }],
        h5: ['20px', { lineHeight: '26px' }],
        h6: ['18px', { lineHeight: '24px' }],
        'body-lg': ['18px', { lineHeight: '24px' }],
        'body-md': ['14px', { lineHeight: '18px' }],
        'body-sm': ['12px', { lineHeight: '16px' }],
        caption: ['14px', { lineHeight: '18px' }],
        button: ['14px', { lineHeight: '18px' }],
      },
      colors: {
        black: '#010214',
        white: '#FFFFFF',
        primary: '#010214', // Explicitly adding primary color
        secondary: '#C7EBCE', // Explicitly adding primary color
        green: {
          50: '#F0F2F2',
          100: '#DAF1DD',
          200: '#C7EBCE', // This is the primary color in the green scale
          300: '#B9DCB8',
          400: '#8BAF73',
          500: '#639356',
          600: '#276543',
          700: '#1E5B37',
          800: '#1A4B20',
          900: '#16312E',
          950: '#082315',
        },
        grey: {
          5: '#F9FAF8',
          10: '#F4F4F6',
          15: '#E9EBEE',
          20: '#E0E0E0',
          30: '#D1D3D0',
          40: '#BABECB',
          50: '#A3A7BA',
          60: '#8C91A9',
          70: '#737788',
          80: '#616161',
          85: '#282931',
          90: '#1C1C22',
          95: '#151518',
        },
        red: {
          10: '#FEEBEB',
          100: '#D02C2C',
        },
        greenStates: {
          10: '#E7F5F3',
          100: '#00C982',
        },
        yellowStates: {
          10: '#F0F4E7',
          100: '#E89313',
        },
      },
      backgroundColor: {
        black: '#010214',
        white: '#FFFFFF',
        primary: '#010214', // Explicitly adding primary color
        secondary: '#C7EBCE', // Explicitly adding primary color
        green: {
          50: '#F0F2F2',
          100: '#DAF1DD',
          200: '#C7EBCE', // This is the primary color in the green scale
          300: '#B9DCB8',
          400: '#8BAF73',
          500: '#639356',
          600: '#276543',
          700: '#1E5B37',
          800: '#1A4B20',
          900: '#16312E',
          950: '#082315',
        },
        grey: {
          5: '#F9FAF8',
          10: '#F4F4F6',
          15: '#E9EBEE',
          20: '#E0E0E0',
          30: '#D1D3D0',
          40: '#BABECB',
          50: '#A3A7BA',
          60: '#8C91A9',
          70: '#737788',
          80: '#616161',
          85: '#282931',
          90: '#1C1C22',
          95: '#151518',
        },
        red: {
          10: '#FEEBEB',
          100: '#D02C2C',
        },
        greenStates: {
          10: '#E7F5F3',
          100: '#00C982',
        },
        yellowStates: {
          10: '#F0F4E7',
          100: '#E89313',
        },
      },
      borderRadius: {
        xs: '4px',
        s: '8px',
        m: '12px',
        l: '16px',
        full: '999px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
