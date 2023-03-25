import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { createClient } from '@supabase/supabase-js'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Funder_account from './Funder_account'
import ProjectCard from '@/components/ProjectCard'
import { useEffect, useState } from 'react'
import { ConnectButton } from 'web3uikit';



export default function FunderLogin() {

  const [cardData, setCardData] = useState([])
  const session = useSession()
  const supabase = useSupabaseClient()
  const getData = async () => {
    const { data, error } = await supabase
      .from('project_profile')
      .select()
    setCardData(data)

  }


  const load = useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <ConnectButton />
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <p>Funder Login</p>
        {!session ? (
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
        ) : (
          <>
            <Funder_account session={session} />
            {
              cardData.map((current) => {
                return <ProjectCard address={current.address} description={current.project_description} name={current.project_name} timeStamp={current.created_at} progress={current.progress} full_value_eligible={current.full_value_eligible} project_id={current.project_id} />
              })
            }
          </>
        )}
      </div>
    </>

  )
}