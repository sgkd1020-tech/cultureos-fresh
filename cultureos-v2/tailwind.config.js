module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        platinum: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        champagne: {
          50: '#fdfdf9',
          100: '#faf8f0',
          200: '#f5f0e0',
          300: '#ede4c8',
          400: '#e0d4ad',
          500: '#d4c599',
          600: '#c2ad7f',
          700: '#a6925f',
          800: '#8a7749',
          900: '#70603a',
        },
        pearl: {
          50: '#fbfbfb',
          100: '#f6f6f7',
          200: '#ededef',
          300: '#e0e0e3',
          400: '#c8c8cd',
          500: '#a9a9b0',
          600: '#8a8a93',
          700: '#6d6d75',
          800: '#535359',
          900: '#3d3d42',
        },
        accent: {
          rose: '#e8d4d4',
          sage: '#d4e8d4',
          sky: '#d4e0e8',
          lavender: '#e0d4e8',
        },
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          info: '#8b5cf6',
        }
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'premium': '0 20px 50px rgba(0, 0, 0, 0.5)',
        'premium-lg': '0 30px 70px rgba(0, 0, 0, 0.6)',
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 30px rgba(212, 197, 153, 0.2)',
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #262626 100%)',
        'gradient-champagne': 'linear-gradient(135deg, #d4c599 0%, #c2ad7f 100%)',
        'gradient-subtle': 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%)',
        'gradient-radial': 'radial-gradient(circle at center, rgba(212, 197, 153, 0.1) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
