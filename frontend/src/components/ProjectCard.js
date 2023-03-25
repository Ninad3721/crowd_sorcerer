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

export default function ProjectCard(props) {
    const { isConnected } = useAccount()
    const [expanded, setExpanded] = React.useState(false);
    const [funding, setFuding] = React.useState(0)

    const handleDonate = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const signer = provider.getSigner();
        if (funding == 0) {
            window.alert("Please enter funding value")
        }
        const transaction_contract = new ethers.Contract("0xcd9D19922E215B8c8C78B5aF531B92a775e7363a", abi, signer)
        const fund = await transaction_contract.fund(props.address)

    }

    return (
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
            <Button style={{ visibility: `${(props.full_refund_eligible ? "visible" : "hidden")}` }}></Button>

        </Card>
    );
}
