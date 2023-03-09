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
                        style={{ height: "60px", width: "auto", margin: "0", padding: '25px 20px' }}
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
                    <div style={{ backgroundColor: 'white', color: 'black', whiteSpace: 'nowrap', marginTop:'20px'}}>
                        <Grid item xs={12} md={12} height="20px" style={{color:'black', fontSize:"20px"}}>
                            { server.servername}
                        </Grid>
                        <Grid item xs={12} md={12} height="20px" style={{color:'black'}}>
                        <div style={{
                            display: 'inline-flex',
                            VerticalAlign: 'text-bottom',
                            BoxSizing: 'inherit',
                            textAlign: 'center',
                            AlignItems: 'center',
                            color:'black'
                        }}>
                            <img alt="Remy Sharp" src={ping_image} style={{width:'28px'}}/>
                            {server.currentPlayers}/{server.maxPlayer} playing now
                        </div> 
                                
                                
                        </Grid>
                        <Grid item xs={12} md={12} height="20px" style={{color:'black'}}>
                            { server.serverVersion}
                        </Grid>
                    </div>
                    
                    
                </Grid>
                <Grid item xs={2} md={2} style={{ backgroundColor: '#292826', textAlign: 'center'}}>
                    <Grid item xs={12} md={12} style={{ backgroundColor: '#292826', height: '50%', textAlign: 'center' }}>
                        {server.ip}
                    </Grid>
                    <Grid item xs={12} md={12} style={
                        {
                            backgroundColor: '#128f0b',
                            height: '50%',
                            textAlign: 'center',
                        }}>

                        COPY
                    </Grid>
                    
                </Grid>
            </Grid>
            ))}
        </div>
     );
}
 
export default Server;