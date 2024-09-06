import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

import { Client, InternetIdentity } from "@bundly/ares-core";
import { IcpConnectContextProvider } from "@bundly/ares-react";

import { candidCanisters } from "@app/canisters";
import { Navbar } from "@app/components/navbar";
import RootLayout from "@app/app/layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  const client = Client.create({
    agentConfig: {
      host: process.env.NEXT_PUBLIC_IC_HOST_URL!,
    },
    candidCanisters,
    providers: [
      new InternetIdentity({
        providerUrl: process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL! || "http:/b77ix-eeaaa-aaaaa-qaada-cai.localhost:4943",
      }),
    ],
  });

  return (
    <IcpConnectContextProvider client={client}  >
       <RootLayout>

      <Component {...pageProps} />

       </RootLayout>
    </IcpConnectContextProvider>
  );
}

