/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        varna: {
          // Obsidian Dark Foundation
          dark: '#050B14',      // Deepest background canvas
          slate: '#091322',     // Elevated card & section background
          navy: '#0B1E3B',      // Translucent panel backdrop & modal base
          blue: '#153E7A',      // Varna legacy deep corporate blue
          
          // Emerald & Fresh Mint (The Rind & Clean Energy)
          emerald: '#059669',   // Primary solar green brand core
          emeraldDark: '#047857',
          mint: '#10B981',      // Luminous eco accent & active status
          mintLight: '#34D399', // Glow highlights & gradient stops
          mintPale: '#A7F3D0',  // Translucent badge backgrounds
          
          // Watermelon Coral-Rose (The Sweet Core & Action CTAs)
          coral: '#FF5364',     // Primary high-converting CTA button color
          coralHover: '#E11D48',
          rose: '#FB7185',      // Secondary gradient highlight & notification tag
          roseLight: '#FDA4AF',
          
          // Solar Flare Amber (The Sun Energy & Subsidy Focus)
          sun: '#FF7A00',       // Solar flare orange, subsidy callouts
          sunHover: '#EA580C',
          amber: '#FFA133',     // Golden amber accent, star ratings
          gold: '#FFB700',      // Metric highlights & awards
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glass-sm': '0 4px 20px -2px rgba(0, 0, 0, 0.25), 0 2px 6px -1px rgba(0, 0, 0, 0.15)',
        'glass-md': '0 12px 32px -4px rgba(0, 0, 0, 0.4), 0 4px 12px -2px rgba(0, 0, 0, 0.2)',
        'glass-lg': '0 20px 48px -6px rgba(5, 11, 20, 0.55), 0 8px 24px -4px rgba(0, 0, 0, 0.3)',
        'glass-xl': '0 25px 60px -12px rgba(5, 11, 20, 0.75)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.4)',
        'glow-coral': '0 0 35px -5px rgba(255, 83, 100, 0.4)',
        'glow-sun': '0 0 35px -5px rgba(255, 122, 0, 0.4)',
        'glow-cyan': '0 0 35px -5px rgba(56, 189, 248, 0.4)',
        'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-solar': 'linear-gradient(135deg, #FF7A00 0%, #FF5364 50%, #FFA133 100%)',
        'gradient-watermelon': 'linear-gradient(135deg, #059669 0%, #10B981 35%, #FF5364 100%)',
        'gradient-eco': 'linear-gradient(135deg, #047857 0%, #10B981 50%, #34D399 100%)',
        'gradient-coral-rose': 'linear-gradient(135deg, #FF5364 0%, #FB7185 100%)',
        'gradient-dark-glass': 'linear-gradient(135deg, rgba(9, 19, 34, 0.85) 0%, rgba(11, 30, 59, 0.65) 100%)',
        'gradient-light-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.75) 100%)',
        'gradient-mesh-dark': 'radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(255, 83, 100, 0.12) 0px, transparent 50%)',
        'gradient-card-dark': 'linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 15s linear infinite',
        'radar-ping': 'radarPing 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marqueeReverse 35s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        radarPing: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
