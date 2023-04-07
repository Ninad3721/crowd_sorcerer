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
      <ConnectButton className={styles.ConnectButton}/>
      <div className= {styles.container} style={{ padding: '50px 0 100px 0' }}>
        <p className={styles.title}>Funder Login</p>
        {!session ? (
          <Auth supabaseClient={supabase}   appearance={{
            style: {
              input: { background: '#eeeee1',textAlign: 'center', color: '#12421f',fontFamily: 'monospace',border: '1px solid #12421f',width: '400px',padding: '10px',borderRadius: '10px' },
              label: { color: '#12421f' ,fontFamily: 'fantasy'},
              button: { background: '#12421f', color: '#eeeee1',fontFamily: 'monospace',border: '1px solid #12421f',width: '400px',marginLeft:'16.5%',padding: '10px' ,borderRadius:'10px'},
            },
          }}
          />
        ) : (
          <>
            <Funder_account session={session} />
            {
              cardData.map((current) => {
                return <ProjectCard address={current.address} description={current.project_description} name={current.project_name} timeStamp={current.created_at} progress={current.progress} full_refund_eligible={current.full_value_eligible} project_id={current.project_id} fundCollected={current.fundCollected} numberOfFunder={current.numberOfFunder} />
              })
            }
          </>
        )}
      </div>
    </>

  )
}