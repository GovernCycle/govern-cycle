

import clsx from 'clsx';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import '@/styles/globals.css';
import 'tailwindcss/tailwind.css';

import { Client, InternetIdentity } from '@bundly/ares-core';
import { IcpConnectContextProvider } from '@bundly/ares-react';

import { candidCanisters } from '@/canisters';
import React from 'react';

type RootLayoutProps = {
  children: React.ReactNode;
};


const client = Client.create({
  agentConfig: {
    host: process.env.NEXT_PUBLIC_IC_HOST_URL!,
  },
  candidCanisters,
  providers: [
    new InternetIdentity({
      providerUrl:
        process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL! ||
        'http://b77ix-eeaaa-aaaaa-qaada-cai.localhost:4943',
    }),
  ],
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (

    <IcpConnectContextProvider client={client}>
    <html
    lang='en'
    className={clsx('scroll-smooth', GeistSans.variable, GeistMono.variable)}
  >
    <body className='bg-[#FEFDF7]'>      <div
        lang="en"
        className={clsx(
          'scroll-smooth',
          GeistSans.variable,
          GeistMono.variable,
          'bg-[#FEFDF7]'
        )}
      >
        {children}
      </div></body>

  </html>
 </IcpConnectContextProvider>
  );
}
