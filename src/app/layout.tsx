// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { Cormorant_Garamond, Great_Vibes, Dancing_Script } from 'next/font/google'

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300','400','500','600','700'],
  display: 'swap',
  variable: '--font-cormorant',
})

export const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-greatvibes',
})

export const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  display: 'swap',
  variable: '--font-dancing',
})

export const viewport = { width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${greatVibes.variable} ${dancing.variable}`}>
      <body>{children}</body>
    </html>
  )
}
