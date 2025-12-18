import type { Metadata } from 'next'
import { Outfit, Playfair_Display, DM_Sans, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-playfair',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
})

export const metadata: Metadata = {
  title: 'Elara - Your AI Fashion Stylist',
  description: 'Dress smarter. Shop better. Feel confident.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${playfairDisplay.variable} ${dmSans.variable} ${plusJakartaSans.variable} font-body antialiased bg-[#0E0E0E]`}>
        {children}
      </body>
    </html>
  )
}

