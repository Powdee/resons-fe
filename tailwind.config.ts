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
    borderRadius: {
      xs: '4px',
      s: '8px',
      m: '12px',
      l: '16px',
      full: '999px',
    },
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
      h1: ['36px', { lineHeight: '44px', letterSpacing: '0px' }],
      h2: ['32px', { lineHeight: '40px', letterSpacing: '0px' }],
      h3: ['28px', { lineHeight: '36px', letterSpacing: '0px' }],
      h4: ['24px', { lineHeight: '32px', letterSpacing: '0px' }],
      h5: ['20px', { lineHeight: '26px', letterSpacing: '0px' }],
      h6: ['18px', { lineHeight: '24px', letterSpacing: '0' }],
      body: ['16px', { lineHeight: '20px', letterSpacing: '0.5px' }],
      'body-md': ['14px', { lineHeight: '18px', letterSpacing: '0.5px' }],
      'body-sm': ['12px', { lineHeight: '16px', letterSpacing: '-.5px' }],
      caption: ['14px', { lineHeight: '16px', letterSpacing: '1.5px' }],
      button: ['14px', { lineHeight: '16px', letterSpacing: '1.5px' }],
    },
    colors: {
      black: '#010214',
      white: '#FFFFFF',
      primary: '#1B1D1C', // Explicitly adding primary color
      secondary: '#C7EBCE', // Explicitly adding primary color
      green: {
        50: '#F0F2F2',
        100: '#DAF1DD',
        200: '#C7E8CE', // This is the primary color in the green scale
        300: '#89CC9B',
        400: '#8BAF73',
        500: '#639356',
        600: '#276543',
        700: '#1E5E37',
        800: '#1A4B2D',
        900: '#163E26',
        950: '#0B2315',
      },
      grey: {
        50: '#F6F7F7',
        100: '#E3E4E4',
        200: '#BABDCB',
        300: '#A1A7A3',
        400: '#7D8480',
        500: '#636966',
        600: '#4E5351',
        700: '#404542',
        800: '#363938',
        900: '#2F3231',
        950: '#1B1D1C',
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
      black: '#010214', // bg-primsry
      white: '#FFFFFF',
      primary: '#1B1D1C', // Explicitly adding primary color
      secondary: '#C7EBCE', // Explicitly adding primary color
      green: {
        50: '#F0F2F2',
        100: '#DAF1DD',
        200: '#C7E8CE', // This is the primary color in the green scale
        300: '#89CC9B',
        400: '#8BAF73',
        500: '#639356',
        600: '#276543',
        700: '#1E5E37',
        800: '#1A4B2D',
        900: '#163E26',
        950: '#0B2315',
      },
      grey: {
        50: '#F6F7F7',
        100: '#E3E4E4',
        200: '#BABDCB',
        300: '#A1A7A3',
        400: '#7D8480',
        500: '#636966',
        600: '#4E5351',
        700: '#404542',
        800: '#363938',
        900: '#2F3231',
        950: '#1B1D1C',
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
