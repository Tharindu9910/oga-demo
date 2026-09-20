import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans, Poppins } from 'next/font/google'

import { SanityLive } from '@/sanity/lib/live'

import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  style: ['normal', 'italic'],
})

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: {
    default: "ILMA International Old Girls' Association",
    template: '%s | ILMA OGA',
  },
  description:
    "The Ilma International Old Girls' Association (IIOGA) brings together alumni of Ilma International Girls' School to uplift, enhance and develop their alma mater.",
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-stone-700">
        {children}
        <SanityLive />
      </body>
    </html>
  )
}
