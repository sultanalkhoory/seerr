// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './node_modules/react-tailwindcss-datepicker-sct/dist/index.esm.js',
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // ===== GLASSMORPHISM DESIGN SYSTEM =====
      // Apple TV-inspired premium design tokens

      colors: {
        // Pure black background
        'glass-black': '#000000',

        // Apple Blue accent color
        'apple-blue': {
          DEFAULT: '#0A84FF',
          50: '#E5F2FF',
          100: '#CCE5FF',
          200: '#99CBFF',
          300: '#66B1FF',
          400: '#3397FF',
          500: '#0A84FF',
          600: '#006ACC',
          700: '#005099',
          800: '#003566',
          900: '#001B33',
        },

        // Glass surface colors with transparency
        'glass': {
          50: 'rgba(255, 255, 255, 0.02)',
          100: 'rgba(255, 255, 255, 0.04)',
          200: 'rgba(255, 255, 255, 0.06)',
          300: 'rgba(255, 255, 255, 0.08)',
          400: 'rgba(255, 255, 255, 0.12)',
          500: 'rgba(255, 255, 255, 0.16)',
          600: 'rgba(255, 255, 255, 0.24)',
          700: 'rgba(255, 255, 255, 0.32)',
          800: 'rgba(255, 255, 255, 0.48)',
          900: 'rgba(255, 255, 255, 0.64)',
        },

        // Glass borders
        'glass-border': {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          light: 'rgba(255, 255, 255, 0.15)',
          medium: 'rgba(255, 255, 255, 0.2)',
          strong: 'rgba(255, 255, 255, 0.3)',
        },

        // Status colors (Apple-style)
        'status': {
          success: '#30D158',
          warning: '#FFD60A',
          error: '#FF453A',
          info: '#64D2FF',
        },

        // Text colors
        'text': {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.7)',
          tertiary: 'rgba(255, 255, 255, 0.5)',
          muted: 'rgba(255, 255, 255, 0.3)',
        },
      },

      // Typography - Inter font system
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Inter', ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        // Display sizes
        'display-2xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-sm': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-xs': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
      },

      // Border radius - Premium rounded corners
      borderRadius: {
        'glass': '16px',
        'glass-sm': '12px',
        'glass-lg': '20px',
        'glass-xl': '24px',
        'glass-2xl': '32px',
        'glass-full': '9999px',
      },

      // Backdrop blur for glassmorphism
      backdropBlur: {
        'glass': '20px',
        'glass-sm': '12px',
        'glass-lg': '40px',
        'glass-xl': '64px',
      },

      // Box shadows - Subtle glows
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glass-sm': '0 4px 16px rgba(0, 0, 0, 0.3)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.5)',
        'glass-xl': '0 24px 64px rgba(0, 0, 0, 0.6)',
        'glass-glow': '0 0 40px rgba(10, 132, 255, 0.15)',
        'glass-glow-lg': '0 0 60px rgba(10, 132, 255, 0.25)',
        'glass-inner': 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
        'glass-ring': '0 0 0 1px rgba(255, 255, 255, 0.1)',
      },

      // Animations and transitions
      transitionProperty: {
        'max-height': 'max-height',
        'width': 'width',
        'glass': 'background-color, border-color, box-shadow, transform, opacity',
      },

      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },

      transitionTimingFunction: {
        'glass': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'glass-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'glass-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // Keyframe animations
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-scale': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(10, 132, 255, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(10, 132, 255, 0.4)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },

      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.4s ease-out',
        'fade-in-down': 'fade-in-down 0.4s ease-out',
        'fade-in-scale': 'fade-in-scale 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.4s ease-out',
        'slide-in-left': 'slide-in-left 0.4s ease-out',
        'slide-in-up': 'slide-in-up 0.4s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
      },

      // Spacing adjustments
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // Z-index layers
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // Typography plugin config
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text.secondary'),
            a: {
              color: theme('colors.apple-blue.DEFAULT'),
              '&:hover': {
                color: theme('colors.apple-blue.400'),
              },
            },
            h1: { color: theme('colors.text.primary') },
            h2: { color: theme('colors.text.primary') },
            h3: { color: theme('colors.text.primary') },
            h4: { color: theme('colors.text.primary') },
            h5: { color: theme('colors.text.primary') },
            h6: { color: theme('colors.text.primary') },
            strong: { color: theme('colors.text.primary') },
            code: { color: theme('colors.text.secondary') },
            figcaption: { color: theme('colors.text.tertiary') },
          },
        },
      }),
    },

    // Aspect ratio
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
      poster: '2 / 3',
      backdrop: '16 / 9',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      14: '14',
      15: '15',
      16: '16',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
