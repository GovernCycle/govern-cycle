// RootLayout.tsx
import clsx from 'clsx';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import '@/styles/globals.css';
import 'tailwindcss/tailwind.css';
import React from 'react';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' className={clsx('scroll-smooth', GeistSans.variable, GeistMono.variable)}>
      <body className='bg-[#FEFDF7]'>
        <div lang="en" className={clsx('scroll-smooth', GeistSans.variable, GeistMono.variable, 'bg-[#FEFDF7]')}>
          {children}
        </div>
      </body>
    </html>
  );
}
