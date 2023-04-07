import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { createClient } from '@supabase/supabase-js'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Inventor_account from './Inventor_account'

export default function InventorLogin() {
  const session = useSession()
  const supabase = useSupabaseClient()
  console.log(session)
  return (

    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <p className={styles.title}>Inventor Login</p>
      {!session ? (
        <Auth supabaseClient={supabase} 
        appearance={{
          style: {
            input: { background: '#eeeee1',textAlign: 'center', color: '#12421f',fontFamily: 'monospace',border: '1px solid #12421f',width: '400px',padding:'10px',borderRadius: '10px' },
            label: { color: '#12421f',fontFamily: 'fantasy' },
            button: { background: '#12421f', color: '#eeeee1',fontFamily: 'monospace',border: '1px solid #12421f',width: '400px',marginLeft:'16.5%',padding:'10px',borderRadius: '10px' },
            //..
          },
        }}
        />
      ) : (
        <Inventor_account session={session} />

      )}
    </div>
  )
}