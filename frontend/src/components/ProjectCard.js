import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { ethers } from 'ethers';
import { abi } from '../../public/transacation_abi'
import { Button } from '@mui/material';
// import { supabase } from '@supabase/auth-ui-react/dist/esm/common/theming';
import { createClient } from '@supabase/supabase-js';
require('dotenv').config()

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)


export default function ProjectCard(props) {
    const { isConnected } = useAccount()
    const [expanded, setExpanded] = React.useState(false);
    const [funding, setFuding] = React.useState(0)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const transaction_contract = new ethers.Contract("0xcd9D19922E215B8c8C78B5aF531B92a775e7363a", abi, signer)

    const fetchLatestProjectData = async () => {
        const { data, error } = await supabase.from("project_profile").select('*').eq('project_id', props.project_id)
        console.log(data[0].project_id)
        return data[0];
    }
    const fetchLatestFunderToProjectData = async () => {
        const account = await provider.send("eth_requestAccounts", [])
        const { data, error } = await supabase.from("funderToProject").select('*').eq('funder_address', account)
        return data;
    }


    const UpdateInventor = async () => {
        const readData = await fetchLatestProjectData();
        const { data, error } = await supabase
            .from('project_profile')
            .update({ numberOfFunder: Number(readData.numberOfFunder) + 1, fundCollected: Number(readData.fundCollected) + Number(funding) })
            .match({ project_id: readData.project_id });
        console.log(error)
        console.log(Number(props.fundCollected) + Number(funding))

    }

    const insertFunder = async () => {
        const account = await provider.send("eth_requestAccounts", [])
        const fetchData = await fetchLatestFunderToProjectData()
        if (fetchData.length == null) {
            const { data, error } = await supabase.from("funderToProject").insert({
                funder_address: account[0],
                project_id: props.project_id,
                amt_funded: funding,
            })
        }
        else {
            const { data, error } = await supabase
                .from('funderToProject')
                .update({ amt_funded: fetchData[0].amt_funded + Number(funding) })
                .match({ funder_address: account, project_id: props.project_id });
        }

    }

    const handleDonate = async () => {

        if (funding == 0) {
            window.alert("Please enter funding value")
        }

        const options = {
            value: ethers.utils.parseEther(funding.toString())
        }
        const fund = await transaction_contract.fund("0x4C6C922a1044Bb6840B926BBD461A1DCff40bd1B", options)
        window.alert("Transaction Succesful")
        console.log("hola")
        await insertFunder()
        await UpdateInventor()
    }

    const handleRetrieve = async () => {
        const retrieve = await transaction_contract.retrieve()
    }


    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            Ninad
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={props.name}
                    subheader={"created by" + props.timeStamp}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image="/static/images/cards/paella.jpg"
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="Donate">
                        <VolunteerActivismIcon onClick={handleDonate} />
                    </IconButton>
                    <IconButton aria-label="share" >
                        <div className="small text-muted mb-1" >Progress 50%</div>
                        <div className="progress mb-1" style={{ height: "3px" }}>
                            <div className="progress-bar" role="progressbar" style={{ width: "50%" }} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </IconButton>
                    <input type="number" onChange={(e) => { setFuding(e.target.value) }}></input>
                </CardActions>
                <Button style={{ visibility: `${(props.full_refund_eligible ? "visible" : "visible")}` }} onClick={handleRetrieve}>Retrieve</Button>

            </Card>
        </>

    );
}
