import * as React from 'react';
import { useState } from 'react'
import styles from '@/styles/Home.module.css'
import Funderlogin from "./Funderlogin"
import Inventorlogin from "./Inventorlogin"
function Lander() {
    const [toggle , setToggle] = useState(false);
    const switchToggle = () =>
    {
        setToggle(!toggle)
    }
  return (
   
    <div className={styles.box}>
        {/* <p>Hello</p> */}
        <h1 className={styles.headerheader}><h1 className={styles.header}>
          <button className={styles.login_funder} onClick={switchToggle}>Funder Login</button>
          <button className={styles.login_inventor} onClick={switchToggle}>Inventor login</button>  
        </h1></h1>
        {
            toggle ?
            (<div className={styles.covered}>
                <Funderlogin/>
            </div> ):
            (<div className={styles.covered}>
                <Inventorlogin/>
            </div>)
            
        }
    </div>
  )
}

export default Lander
