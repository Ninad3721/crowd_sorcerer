import * as React from 'react';
import { useState } from 'react'
import Funderlogin from "./Funderlogin"
import Inventorlogin from "./Inventorlogin"
function Lander() {
    const [toggle , setToggle] = useState(false);
    const switchToggle = () =>
    {
        setToggle(!toggle)
    }
  return (
   
    <div>
        <p>Hello</p>
      <button onClick={switchToggle}>Funder Login</button>
        <button onClick={switchToggle}>Inventor login</button>

        {
            toggle ?
            (<div>
                <Funderlogin/>
            </div> ):
            (<div>
                <Inventorlogin/>
            </div>)
            
        }
    </div>
  )
}

export default Lander
