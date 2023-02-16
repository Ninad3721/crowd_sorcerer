import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { MoralisProvider } from "react-moralis";
require('dotenv').config()


export default function App({ Component, pageProps }) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient({supabaseKey:"https://gdltqbhgqcripymfenqh.supabase.co",
supabaseKey:  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkbHRxYmhncWNyaXB5bWZlbnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2NTM0NTQsImV4cCI6MTk5MDIyOTQ1NH0.B5MgOAVsQfDKVA40F9J3-_Pgl9XTtr6kj6yW-A-txBY"}))

  return (
    <MoralisProvider initializeOnMount={false}>
      <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
    </MoralisProvider>
    
  )
}

