/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'fade-in-overlay': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-out-overlay': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        'fade-in-content': {
          '0%': { 
            opacity: '0',
            transform: 'translate(-50%, -45%) scale(0.98)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)'
          }
        },
        'fade-out-content': {
          '0%': { 
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)'
          },
          '100%': { 
            opacity: '0',
            transform: 'translate(-50%, -45%) scale(0.98)'
          }
        }
      },
      animation: {
        'fade-in-overlay': 'fade-in-overlay 0.2s ease-out',
        'fade-out-overlay': 'fade-out-overlay 0.2s ease-in',
        'fade-in-content': 'fade-in-content 0.2s ease-out forwards',
        'fade-out-content': 'fade-out-content 0.2s ease-in forwards'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('tailwindcss-animate')
  ],
};
