import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { createClient } from '@supabase/supabase-js'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Funder_account from './Funder_account'
import ProjectCard from '@/components/ProjectCard'
import { useEffect } from 'react'

export default function FunderLogin() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const getData = async () => {
    const { data, error } = await supabase
      .from('Projects')
      .select()
    console.log(data)
  }

  const load = useEffect(() => {

    getData()
  }, [])

  return (

    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <p>Funder Login</p>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <>
          <Funder_account session={session} />
          <ProjectCard></ProjectCard>
        </>
      )}
    </div>
  )
}