/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: 'rgb(var(--bg-sand-rgb) / <alpha-value>)',
          50: '#FBFBF9',
          100: 'rgb(var(--bg-sand-rgb) / <alpha-value>)',
          200: 'rgb(var(--card-bone-rgb) / <alpha-value>)',
          300: '#E5DFC9',
          400: '#D5CDB1',
        },
        ink: {
          DEFAULT: 'rgb(var(--ink-slate-rgb) / <alpha-value>)',
          light: 'rgb(var(--ink-slate-rgb) / <alpha-value>)',
          soft: 'rgb(var(--muted-stone-rgb) / <alpha-value>)',
        },
        stone: {
          DEFAULT: 'rgb(var(--muted-stone-rgb) / <alpha-value>)',
          light: '#8D9691',
          dark: '#525754',
        },
        linen: {
          DEFAULT: 'rgb(var(--hairline-linen-rgb) / <alpha-value>)',
          light: '#ECE8D4',
          dark: '#26302B',
        },
        bone: {
          DEFAULT: 'rgb(var(--card-bone-rgb) / <alpha-value>)',
          hover: 'rgb(var(--card-bone-hover-rgb) / <alpha-value>)',
        },
        terracotta: {
          DEFAULT: 'rgb(var(--accent-terracotta-rgb) / <alpha-value>)',
          hover: '#B54D27',
          light: '#F8ECE7',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      borderWidth: {
        'hairline': '1px',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
