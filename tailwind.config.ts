import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // ← Dark mode support ko lagi (manual toggle)
  
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Admin specific paths
    './admin/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  
  theme: {
    extend: {
      // ============ COLORS ============
      colors: {
        // Primary Colors (#091426)
        primary: {
          50: '#e8eaf0',
          100: '#c5cad6',
          200: '#9ea6b9',
          300: '#77829c',
          400: '#5a6885',
          500: '#091426', // Main
          600: '#081221',
          700: '#060e1b',
          800: '#050b15',
          900: '#03070f',
          950: '#02050a',
          DEFAULT: '#091426', // Default primary
        },
        
        // Secondary Colors (#0058BE)
        secondary: {
          50: '#e6f0fa',
          100: '#c0d9f3',
          200: '#96bfeb',
          300: '#6ba5e2',
          400: '#4c91dc',
          500: '#0058BE', // Main
          600: '#0050ab',
          700: '#004594',
          800: '#003a7e',
          900: '#002a5b',
          950: '#001d3f',
          DEFAULT: '#0058BE',
        },
        
        // Tertiary Colors (#007472)
        tertiary: {
          50: '#e6f2f2',
          100: '#c0dede',
          200: '#96c8c7',
          300: '#6bb2b0',
          400: '#4ca19f',
          500: '#00a472', // Main
          600: '#006866',
          700: '#005857',
          800: '#004948',
          900: '#003534',
          950: '#002423',
          DEFAULT: '#007472',
        },
        
        // Neutral Colors (#F7F9FB)
        neutral: {
          50: '#fdfdfe',
          100: '#fafbfd',
          200: '#f5f7fa',
          300: '#f0f3f7',
          400: '#eceff4',
          500: '#F7F9FB', // Main
          600: '#dee0e2',
          700: '#b9bcc0',
          800: '#94989d',
          900: '#6a6e73',
          950: '#4a4d51',
          DEFAULT: '#F7F9FB',
        },
        
        // Status Colors (Admin panel ko lagi important)
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          DEFAULT: '#22c55e',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          DEFAULT: '#f59e0b',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          DEFAULT: '#ef4444',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          DEFAULT: '#3b82f6',
        },
      },
      
      // ============ FONTS ============
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        headline: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        label: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      
      // ============ FONT SIZES ============
      fontSize: {
        // Headline
        'headline-xl': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700', letterSpacing: '-0.02em' }],
        'headline-lg': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700', letterSpacing: '-0.01em' }],
        'headline-md': ['1.5rem', { lineHeight: '2rem', fontWeight: '600', letterSpacing: '-0.01em' }],
        'headline-sm': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'headline-xs': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        
        // Body
        'body-lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'body-xs': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        
        // Label
        'label-lg': ['1rem', { lineHeight: '1.5rem', fontWeight: '500' }],
        'label-md': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        'label-sm': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
        'label-xs': ['0.625rem', { lineHeight: '0.875rem', fontWeight: '500' }],
        
        // Additional small sizes
        'tiny': ['0.5rem', { lineHeight: '0.75rem', fontWeight: '400' }],
      },
      
      // ============ SPACING ============
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '120': '30rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
      },
      
      // ============ BORDER RADIUS ============
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'default': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
        // Custom admin panel sizes
        'card': '0.75rem',
        'button': '0.375rem',
        'input': '0.375rem',
      },
      
      // ============ BOX SHADOW ============
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'default': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        // Custom admin panel shadows
        'card': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
        'dropdown': '0 10px 40px rgba(0,0,0,0.08)',
        'navbar': '0 1px 0 rgba(0,0,0,0.05)',
      },
      
      // ============ TRANSITION ============
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      
      // ============ ANIMATION ============
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      
      // ============ KEYFRAMES ============
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-10px)', opacity: '0' },
        },
      },
      
      // ============ Z-INDEX ============
      zIndex: {
        '1': '1',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        'auto': 'auto',
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080',
        'max': '9999',
      },
      
      // ============ BACKGROUND IMAGE ============
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
        'gradient-secondary': 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-dark) 100%)',
        'gradient-tertiary': 'linear-gradient(135deg, var(--color-tertiary) 0%, var(--color-tertiary-dark) 100%)',
      },
      
      // ============ MIN/MAX WIDTH ============
      minWidth: {
        '0': '0',
        'full': '100%',
        'min': 'min-content',
        'max': 'max-content',
        'fit': 'fit-content',
        'sidebar': '240px',
        'button': '100px',
      },
      
      maxWidth: {
        'container': '1280px',
        'sidebar': '280px',
        'dialog': '600px',
        'modal': '800px',
      },
      
      // ============ MIN/MAX HEIGHT ============
      minHeight: {
        'screen-75': '75vh',
        'screen-50': '50vh',
        'screen-25': '25vh',
      },
    },
  },
  
  plugins: [
    // Optional: Add custom plugins if needed
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}

export default config