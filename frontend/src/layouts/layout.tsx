import clsx from 'clsx';
// import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono';


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
    <body >{children}</body>
  </html>
  );
}
