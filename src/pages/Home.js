import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';




export default function Home() {
    const ping_image = '..\\Resources\\Files\\Images\\ping.png';
    const [url, setURL] = useState('..\\Resources\\Files\\ServerThumbnails\\');
    const [servers, setServers] = useState(null);
    const videoEl = useRef(null);

    const attemptPlay = () => {
        videoEl &&
            videoEl.current &&
            videoEl.current.play().catch(error => {
                console.error("Error attempting to play", error);
            });
    };

    useEffect(() => {
        attemptPlay();
    }, []);

    async function fetchData() {
        try {
            const response = await axios.get("https://localhost:7296/status")
            setServers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

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
                    <h2>Welcome to server information:</h2>
                </Grid>
            </Grid>
            {servers && servers.map((server) => (
                <Grid container spacing={0} height="120px" key={server.id}
                    style={{
                        backgroundColor: '#292826',
                        marginBottom: '20px',
                        color: 'black'
                    }}>
                    <Grid item xs={1} md={1}>

                    </Grid>
                    <Grid item xs={5} md={5} style={{ backgroundColor: 'white', color: 'black', alignItems: 'center', align: 'center' }}>
                        <video
                            style={{ height: "60px", width: "468px", margin: "0", padding: '25px 20px' }}
                            autoPlay
                            playsInline
                            loop
                            muted
                            alt="All the devices"
                            src={url + server.thumbnailPath}
                            ref={videoEl}
                        />
                    </Grid>
                    <Grid item xs={4} md={4} style={{ backgroundColor: 'white', color: 'black', alignItems: 'center', align: 'center' }} >
                        <Grid item xs={12} md={12} height="40px" style={{ backgroundColor: 'white', color: 'black', alignItems: 'center', align: 'center' }} >
                        </Grid>
                        <Grid item xs={12} md={12} height="40px" style={{ backgroundColor: 'white', color: 'black', alignItems: 'center', align: 'center' }} >
                            <img src={ping_image} width="30px" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
                            {server.currentPlayers}/{server.maxPlayer} playing now
                        </Grid>
                        <Grid item xs={12} md={12} height="40px"  style={{ backgroundColor: 'white', color: 'black', alignItems: 'center', align: 'center' }} >
                        </Grid>
                        
                    </Grid>
                    <Grid item xs={2} md={2} style={{ backgroundColor: '#292826' }}>
                        <Grid item xs={12} md={12} style={{ backgroundColor: '#292826', height: '50%' }}>
                            {server.serverVersion}
                        </Grid>
                        <Grid item xs={12} md={12} style={{ backgroundColor: '#128f0b', height: '50%' }}>
                            {server.ip}
                        </Grid>

                    </Grid>
                </Grid>
            ))}
        </div>
    )
}