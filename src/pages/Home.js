import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Server from '../Components/Servers'
import Grid from '@mui/material/Grid';
import Cookies from 'js-cookie'
import { SERVERIP } from "../LOCAL";
import { useParams, useLoaderData } from "react-router-dom";



export default function Home() {
    
    const videoEl = useRef(null);
    const [loaded, setloaded] = useState(false);
    const serverlist = useLoaderData();

    const attemptPlay = () => {
        videoEl &&
            videoEl.current &&
            videoEl.current.play().catch(error => {
                console.error("Error attempting to play", error);
            });
    };

    useEffect(() => {
        attemptPlay();
    }, [loaded]);

    return (
        <div className="home">
            <Grid container spacing={0} style={{ backgroundColor: '#3d4491' }} width="120">
                <Grid item xs={12} md={12}>

                </Grid>
            </Grid>
            <Server servers={serverlist}></Server>
        </div>
    )
}