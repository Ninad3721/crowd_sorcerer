import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { createClient } from '@supabase/supabase-js'
import { useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import Account from './account'

export default function InventorLogin()
{
    const session = useSession()
    const supabase = useSupabaseClient()
    console.log(session)
    return (
  
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <p>Inventor Login</p>
        {!session ? (
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
        ) : (
          <Account session={session}/>

        )}
      </div>
    )
}