
import { createClient } from '@supabase/supabase-js'
import {useState} from 'react';
import { ConnectButton } from "web3uikit";
import { useRouter } from "next/router";

require('dotenv').config()



const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)


export  default function AddProject(session)
{
  
    // const [userId , setUserId] = useState(0)
    const [projectName,setProjectName ] = useState("")
    const [proposedAmt,setProposedAmt ] = useState(0)
    const [description,setDescription ] = useState("")
    const [publicKey, setPublicKey] = useState("")
    const [username,setUsername] = useState("")
    const router = useRouter();
    const query_data = router.query.id

    async function AuthData()
    {
      console.log(query_data)
    }
    async function fetch_username()
    {
   
      const  {data, error} = await supabase.from("profiles").select('username').eq('id',query_data)
      console.log(data)
      console.log(error)
 
      return data[0].username
    }
    async function handelSubmit(e)
    {
      e.preventDefault();
        const _username = await fetch_username()
        setUsername(_username)
        // console.log(userId + " " + projectName+" "+ proposedAmt+ " "+ description)
        try {
   
          const {data, error}  = await supabase.from("Projects").insert({
            
            id:query_data,
            username: username,
            project_name: projectName,
            proposed_amt: proposedAmt,
            project_description: description,
            public_key : publicKey
          })

          console.log(data)
          console.log(error)

          
        } catch (error) {
          console.log(error)
        }
        
        // const {data, error} = await supabase.from("Projects").insert{}
    }
    return (

     
     
      
      <>
    
          <p> Warning ! The Account that you connect your wallet will be the primary account for all the transaction</p>
      <form  to="/AddProject" onSubmit={(e)=> {handelSubmit(e)}}>
       <p>Project Name</p>
      <input type="text" value = {projectName} onChange= {(e)=>{setProjectName(e.target.value)}}/><br/>

      <p >Proposed Amount</p>
       <input type="text" value = {proposedAmt} onChange= {(e)=>{setProposedAmt(e.target.value)}}/><br/>

       <p> Public Wallet Key</p>
       <input type="text" value = {publicKey} onChange= {(e)=>{setPublicKey(e.target.value)}}/><br/>

      <p > Description</p>
        <textarea type = "text" value = {description} onChange= {(e)=>{setDescription(e.target.value)}}></textarea><br/>

        <p>Logo or picture realated to your Project </p>
        <input type='file'/> <br/>

        <input type="submit"/>  
      </form>
      <button onClick={AuthData}>Auth Data</button>
      <ConnectButton></ConnectButton>
      </>
    )
}


