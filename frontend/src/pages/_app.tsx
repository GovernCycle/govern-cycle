import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { Client, InternetIdentity } from '@bundly/ares-core';
import { IcpConnectContextProvider } from '@bundly/ares-react';
import { candidCanisters } from '@app/canisters';
import '@/styles/globals.css';
import { UserContext, useUserState } from '@app/context/userContext';
import { useState, useEffect } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<Client | null>(null);
  const userState = useUserState(); // Uso del estado del usuario

  useEffect(() => {
    const createClient = async () => {
      const client = await Client.create({
        agentConfig: {
          host: process.env.NEXT_PUBLIC_IC_HOST_URL!,
        },
        candidCanisters,
        providers: [
          new InternetIdentity({
            providerUrl: process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL!,
          }),
        ],
      });

      setClient(client);
    };

    createClient();
  }, []);

  if (!client) return <div>Loading...</div>;

  return (
    <IcpConnectContextProvider client={client}>
      <UserContext.Provider value={userState}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </IcpConnectContextProvider>
  );
}