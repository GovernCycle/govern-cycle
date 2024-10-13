import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { Client, InternetIdentity } from '@bundly/ares-core';
import { IcpConnectContextProvider } from '@bundly/ares-react';
import { candidCanisters } from '@app/canisters';
import { useEffect, useState } from 'react';
import '@/styles/globals.css';
import { User } from '@app/declarations/home/home.did';
import { UserContext } from '@app/context/userContext';


export default function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<Client | null>(null);
  const [user, setUser] = useState<User | null>(null);

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
              process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL!,
            // process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL! || 'https://identity.ic0.app',
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
      <UserContext.Provider value={{ user, setUser }}>
        {/* Wrap the Component inside RootLayout */}
        <Component {...pageProps} />
      </UserContext.Provider>
    </IcpConnectContextProvider>
  );
}
