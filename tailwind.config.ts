// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  // v4 doesn't require `content`, but leaving it here won’t hurt
  content: [
    './src/app/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ['var(--font-geist-sans)', 'sans-serif'],
        mono:  ['var(--font-geist-mono)', 'monospace'],
        dm:    ['var(--font-dm-sans)', 'sans-serif'],

        // these won’t auto-create utilities in v4,
        // but keeping them is fine for future use
        cormorant: 'var(--font-cormorant)',
        vibes:     'var(--font-greatvibes)',
        dancing:   'var(--font-dancing)',
      },
    },
  },
  plugins: [],
}

export default config
