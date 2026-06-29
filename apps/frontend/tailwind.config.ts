import type { Config } from 'tailwindcss';

/**
 * Every brand color is exposed as a token that resolves to a CSS variable defined
 * in app/globals.css `:root`. Use these tokens (e.g. `bg-primary`, `text-text-secondary`)
 * — never hardcode hex values in components.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    // Shared UI package is shipped as TS source and must be scanned for classes.
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          light: 'var(--primary-light)',
          soft: 'var(--primary-soft)',
        },
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        highlight: 'var(--highlight)',
        background: 'var(--background)',
        surface: 'var(--surface)',
        text: {
          DEFAULT: 'var(--text)',
          secondary: 'var(--text-secondary)',
        },
        border: 'var(--border)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        info: 'var(--info)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-jakarta)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
