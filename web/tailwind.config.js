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
        // ═══ INK & SUN — Bold Editorial System ═══
        ink: {
          DEFAULT: '#16150F',   // Primary text, solid sections, buttons
          soft: '#4A483E',      // Secondary body copy
          mute: '#77746A',      // Captions, meta text
        },
        paper: {
          DEFAULT: '#F4F3EE',   // Page canvas
          deep: '#EAE8DF',      // Alternating section tint
          card: '#FBFAF7',      // Card surface (barely lifted)
        },
        sun: {
          DEFAULT: '#FF4D00',   // THE accent. One accent, whole page.
          hover: '#D94100',
          tint: '#FFE3D6',      // Wash backgrounds, highlight rows
        },

        // ═══ Legacy palette — retuned to system. Do not use in new code. ═══
        varna: {
          dark: '#16150F',
          slate: '#1E1C15',
          navy: '#2A2820',
          blue: '#4A483E',
          emerald: '#16150F',
          emeraldDark: '#16150F',
          mint: '#FF4D00',
          mintLight: '#FF4D00',
          mintPale: '#FFE3D6',
          coral: '#FF4D00',
          coralHover: '#D94100',
          rose: '#FF4D00',
          roseLight: '#FFE3D6',
          sun: '#FF4D00',
          sunHover: '#D94100',
          amber: '#FF4D00',
          gold: '#FF4D00',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Archivo"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      boxShadow: {
        'editorial': '8px 8px 0 0 #16150F',
        'editorial-sun': '8px 8px 0 0 #FF4D00',
        'card': '0 1px 2px rgba(22, 21, 15, 0.06)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 14s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
