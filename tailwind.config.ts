import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F4EF',
        sand: '#EFE9DF',
        line: '#E5DED2',
        ink: '#1E1E1E',
        muted: '#6F6A63',
        clay: '#8A7360',
        accent: '#A98B63',
        nude: '#D8C7AE',
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
