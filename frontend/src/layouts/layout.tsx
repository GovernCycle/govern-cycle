import clsx from 'clsx';
// import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono';
import '@/styles/globals.css';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={clsx('scroll-smooth')}
    >
      <body className='bg-zinc-900'>{children}</body>
    </html>
  );
}
