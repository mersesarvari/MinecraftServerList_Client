import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Server from '../Components/Server'
import Grid from '@mui/material/Grid';
import Cookies from 'js-cookie'




export default function Home() {
    
    const [servers, setServers] = useState(null);
    const videoEl = useRef(null);
    const [loaded, setloaded] = useState(false);

    const attemptPlay = () => {
        videoEl &&
            videoEl.current &&
            videoEl.current.play().catch(error => {
                console.error("Error attempting to play", error);
            });
    };

    useEffect(() => {
        fetchData();
        attemptPlay();
    }, [loaded]);

    async function fetchData() {
        try {
            if (Cookies.get('email') !== undefined && Cookies.get('password') !== undefined) {
                console.log('You are logged in: ' + Cookies.get('email'));
            } else {
                console.log('You are not logged in!');
            }
            const response = await axios.get("https://localhost:7296/server")
            setServers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    function getserverStatus(status) {
        if (status == true) {
            return "Online";
        } else {
            return "Offline";
        }
    }

    return (
        <div className="home">
            <Grid container spacing={0} style={{ backgroundColor: '#3d4491' }} width="120">
                <Grid item xs={12} md={12}>

                </Grid>
            </Grid>
            <Server servers={servers}></Server>
        </div>
    )
}