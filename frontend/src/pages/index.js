import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { createClient } from '@supabase/supabase-js'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from './Inventor_account'
import Lander from "./lander"


const Home = () => {

  return (
      <Lander />
  )


}

export default Home