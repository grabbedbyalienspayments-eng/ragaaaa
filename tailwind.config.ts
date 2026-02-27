
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fdf5f3',
          100: '#fae8e4',
          200: '#f5d0c8',
          300: '#e8a598',
          400: '#d9806e',
          500: '#c45f4a',
          600: '#a84535',
          700: '#8a3529',
          800: '#722c22',
          900: '#5e261d',
        },
        cream: '#f0ece6',
        dark: {
          DEFAULT: '#080808',
          2: '#0f0f0f',
          3: '#141414',
          4: '#1a1a1a',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        '10xl': ['10rem', { lineHeight: '0.9' }],
        '11xl': ['12rem', { lineHeight: '0.85' }],
      },
      letterSpacing: {
        widest: '0.25em',
        'ultra': '0.4em',
      },
      backgroundImage: {
        'rose-radial': 'radial-gradient(ellipse at center, rgba(232,165,152,0.15) 0%, transparent 70%)',
        'dark-vignette': 'radial-gradient(ellipse at center, transparent 0%, rgba(8,8,8,0.5) 70%, rgba(8,8,8,0.9) 100%)',
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
        'float': 'floatY 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'marquee': 'marqueeScroll 30s linear infinite',
      },
    },
  },
  plugins: [],
}
