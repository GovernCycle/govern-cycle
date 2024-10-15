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
          }),
        ],
      });
      setClient(client);
    };

    createClient();
  }, []);

  useEffect(() => {
    console.log('User', user); // Muestra el usuario cuando cambia
  }, [user]);

  if (!client) return <div>Loading...</div>; // Asegúrate de que el cliente esté listo antes de renderizar la app

  return (
    <IcpConnectContextProvider client={client}>
      <UserContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </IcpConnectContextProvider>
  );
}
