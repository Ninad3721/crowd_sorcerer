import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { MoralisProvider } from "react-moralis";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
require('dotenv').config()


export default function App({ Component, pageProps }) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient({
    supabaseKey: "https://gdltqbhgqcripymfenqh.supabase.co",
    supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkbHRxYmhncWNyaXB5bWZlbnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2NTM0NTQsImV4cCI6MTk5MDIyOTQ1NH0.B5MgOAVsQfDKVA40F9J3-_Pgl9XTtr6kj6yW-A-txBY"
  }))

  const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [
      alchemyProvider({ apiKey: "oqeOc94obCxkJEpe3KNrK3MzHE6Y3pmy" }),
      publicProvider()
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: 'Crowd Sorcerer',
    chains
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  return (
    <MoralisProvider initializeOnMount={false}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </SessionContextProvider>
    </MoralisProvider>

  )
}

