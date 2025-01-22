import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        background: 'var(--background-color)',
        foreground: 'var(--foreground-color)',
        primaryText: 'var(--primary-text-color)',
        secondaryText: 'var(--secondary-text-color)',
      },
    },
  },
  plugins: [],
} satisfies Config;
