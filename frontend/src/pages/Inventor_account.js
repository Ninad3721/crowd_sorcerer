import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Avatar from './Avatar'
import AddProject from './AddProject'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'



export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)


  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.block}>

      <div>
        {/* Add to the body */}
        <Avatar
          uid={user.id}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url)
            updateProfile({ username, website, avatar_url: url })
          }}
        />
        {/* ... */}
      </div>
      <div className={styles.form_widget}>
        <div>
          <label htmlFor="email" className={styles.in}>Email</label>
          <input className={styles.out} id="email" type="text" value={session.user.email} disabled />
        </div>
        <div>
          <label className={styles.in} htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className={styles.out}
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className={styles.in}   htmlFor="website">Website</label>
          <input
            id="website"
            className={styles.out}
            type="website"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div>
          <button
            className={styles.but}
            onClick={() => updateProfile({ username, website, avatar_url })}

            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </div>
        <div>
          <button className={styles.but} onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
          <br></br>
          <Link className={styles.link} href={{
            pathname: "/AddProject",
            query: session.user, // the data
          }}>
            Add Project
          </Link>


        </div>
      </div>
    </div>

  )
}

export const getServerSideProps = (session) => {

  return {
    props: {
      _session: session//pass it to the page props
    }
  }
}

