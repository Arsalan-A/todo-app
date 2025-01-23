import type { Config } from 'tailwindcss';
import lineClamp from '@tailwindcss/line-clamp';

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
        accent: 'var(--accent-color)',
        primaryText: 'var(--primary-text-color)',
        secondaryText: 'var(--secondary-text-color)',
      },
    },
  },
  plugins: [lineClamp],
} satisfies Config;
