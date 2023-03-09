import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const Server = (props) => {
    const ping_image = '..\\Resources\\Files\\Images\\ping.png';
    const [url, setURL] = useState('..\\Resources\\Files\\ServerThumbnails\\');

    const videoEl = useRef(null);


    return ( 
        <div>
            {props.servers && props.servers.map((server) => (
                <Grid container spacing={0} height="120px" key={server.id}
                style={{
                    backgroundColor: '#292826',
                    marginBottom: '20px',
                    color: 'black'
                }}>
                <Grid item xs={1} md={1}>

                </Grid>
                <Grid item xs={5} md={5} style={{ backgroundColor: 'white', color: 'black' }}>
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
                <Grid item xs={4} md={4} style={{ backgroundColor: 'white', color: 'black' }} >
                    <Grid item xs={12} md={12} height="40px" style={{ backgroundColor: 'white', color: 'black' }} >
                    </Grid>
                    <Grid item xs={12} md={12} height="40px" style={{ backgroundColor: 'white', color: 'black'}} >
                        <Grid item xs={12} style={{ color: 'black', verticalAlign: 'middle', display:'inline-block', float:'felt' }}>
                            {server.currentPlayers}/{server.maxPlayer} playing now
                            <Avatar alt="Remy Sharp" src={ping_image} />
                            
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} height="40px" style={{ backgroundColor: 'white', color: 'black', whiteSpace: 'nowrap', }} >
                        { server.id}
                    </Grid>
                    
                </Grid>
                <Grid item xs={2} md={2} style={{ backgroundColor: '#292826', textAlign: 'center'}}>
                    <Grid item xs={12} md={12} style={{ backgroundColor: '#292826', height: '50%', textAlign: 'center' }}>
                        {server.serverVersion}
                    </Grid>
                    <Grid item xs={12} md={12} style={
                        {
                            backgroundColor: '#128f0b',
                            height: '50%',
                            textAlign: 'center',
                        }}>

                        {server.ip}
                    </Grid>

                </Grid>
            </Grid>
            ))}
        </div>
     );
}
 
export default Server;