import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { Client, InternetIdentity } from '@bundly/ares-core';
import { IcpConnectContextProvider } from '@bundly/ares-react';
import { candidCanisters } from '@app/canisters';
import { useEffect, useState } from 'react';
import RootLayout from '@app/layouts/layout';


export default function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const createClient = async () => {
      const client = await Client.create({
        agentConfig: {
          host: process.env.NEXT_PUBLIC_IC_HOST_URL!,
        },
        candidCanisters,
        providers: [
          new InternetIdentity({
            providerUrl:
              process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL! || 'https://identity.ic0.app',
          }),
        ],
      });

      setClient(client);
    };

    createClient();
  }, []);

  if (!client) return <div>Loading...</div>; // Ensure the client is ready before rendering the app

  return (
    <IcpConnectContextProvider client={client}>
      {/* Wrap the Component inside RootLayout */}
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </IcpConnectContextProvider>
  );
}
