import clsx from 'clsx'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@/styles/globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={clsx('scroll-smooth', GeistSans.variable, GeistMono.variable)}
    >
      <body className='bg-[#FEFDF7]'>{children}</body>
    </html>
  )
}
