// __next_app__.tsx
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

import { candidCanisters } from '@/canisters';
import RootLayout from '@/app/layout';
import { Client, InternetIdentity } from '@bundly/ares-core';
import { IcpConnectContextProvider } from '@bundly/ares-react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const client = Client.create({
    agentConfig: {
      host: process.env.NEXT_PUBLIC_IC_HOST_URL!,
    },
    candidCanisters,
    providers: [
      new InternetIdentity({
        providerUrl:
          process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL! || 'http:/br5f7-7uaaa-aaaaa-qaaca-cai.localhost:4943',
      }),
    ],
    
  });
  

  return (
    <IcpConnectContextProvider client={client}>
      
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </IcpConnectContextProvider>
  );
}
