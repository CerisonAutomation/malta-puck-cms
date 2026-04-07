import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--pm-accent)',
        'accent-fg': 'var(--pm-accent-fg)',
        background: 'var(--pm-bg)',
        surface: 'var(--pm-bg-3)',
        border: 'var(--pm-border)',
        foreground: 'var(--pm-text)',
        muted: 'var(--pm-text-muted)',
      },
      fontFamily: {
        sans: ['var(--pm-font)'],
      },
      borderRadius: {
        DEFAULT: 'var(--pm-radius)',
        pm: 'var(--pm-radius)',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'fade-in': 'fadeIn 0.3s ease',
        'slide-up': 'slideUp 0.3s ease',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
