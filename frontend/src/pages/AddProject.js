
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { ethers } from 'ethers/lib';

require('dotenv').config()



const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)


export default function AddProject(session) {

  // const [userId , setUserId] = useState(0)
  const [projectName, setProjectName] = useState("")
  const [proposedAmt, setProposedAmt] = useState(0)
  const [description, setDescription] = useState("")
  const [publicKey, setPublicKey] = useState("")
  const [username, setUsername] = useState("")
  const router = useRouter();
  const query_data = router.query.id

  async function AuthData() {
    console.log(query_data)
  }

  async function handelSubmit(e) {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const public_key = await provider.send("eth_requestAccounts", []);

    //  console.log(userId + " " + projectName+" "+ proposedAmt+ " "+ description)
    try {

      const { data, error } = await supabase.from("project_profile").insert({
        user_id: query_data,
        project_name: projectName,
        proposed_amt: proposedAmt,
        project_description: description,
        address: public_key[0],
      })
      window.alert("Project Added Succesfully")


    } catch (error) {
      console.log(error)
    }

    // const {data, error} = await supabase.from("Projects").insert{}
  }
  return (
    <>
      <div>
        <p> Warning ! The Account that you connect your wallet will be the primary account for all the transaction</p>
        <p>You can make only project per account !</p>
        <form to="/AddProject" onSubmit={(e) => { handelSubmit(e) }}>
          <p>Project Name</p>
          <input type="text" value={projectName} onChange={(e) => { setProjectName(e.target.value) }} /><br />

          <p >Proposed Amount</p>
          <input type="text" value={proposedAmt} onChange={(e) => { setProposedAmt(e.target.value) }} /><br />

          <p > Description</p>
          <textarea type="text" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea><br />

          <p>Logo or picture realated to your Project </p>
          <input type='file' /> <br />

          <input type="submit" />
        </form>
        <button onClick={AuthData}>Auth Data</button>
        <ConnectButton></ConnectButton>
      </div>

    </>
  )
}


