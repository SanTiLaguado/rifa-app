/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-black': '#0D0A08',
        'brand-dark': '#1A0F05',
        'brand-dark2': '#120800',
        'brand-orange': '#FF6B1A',
        'brand-orange-dark': '#CC4400',
        'brand-red': '#CC2200',
        'brand-red-dark': '#8B0000',
        'brand-gold': '#FFD700',
        'brand-gold-dark': '#C89B00',
        'brand-gold-light': '#FFE966',
        'brand-cream': '#FFF0D4',
      },
      fontFamily: {
        gothic: ['"Cinzel Decorative"', 'serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { textShadow: '0 0 20px #FFD700, 0 0 40px #FF6B1A' },
          '50%': { textShadow: '0 0 40px #FFD700, 0 0 80px #FF6B1A' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
