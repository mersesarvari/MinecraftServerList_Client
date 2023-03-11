import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import BoyIcon from '@mui/icons-material/Boy';
import Man2Icon from '@mui/icons-material/Man2';

//style
import '../style/css/googlefonts.css';
import { fontStyle } from '@mui/system';

const Server = (props) => {
    const ping_image = '..\\Resources\\Files\\Images\\ping.png';
    const [thumbnailurl, setLogourl] = useState('..\\Resources\\Files\\ServerThumbnails\\');
    const [logourl, setThumbnailurl] = useState('..\\Resources\\Files\\ServerLogos\\');

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
                    <img src={logourl + server.logoPath} style={{margin:'25px 15px', width: '60px',height: '60px'}} />

                </Grid>
                <Grid item xs={5} md={5} style={{ backgroundColor: 'white', color: 'black' }}>
                    <video
                        style={{ height: "60px", width: "auto", margin: "0", padding: '20px 25px' }}
                        autoPlay
                        playsInline
                        loop
                        muted
                        alt="All the devices"
                        src={thumbnailurl + server.thumbnailPath}
                        ref={videoEl}
                    />
                </Grid>
                <Grid item xs={4} md={4} style={{ backgroundColor: 'white', color: 'black' }} >
                    <div style={{ backgroundColor: 'white', color: 'black', whiteSpace: 'nowrap', marginTop:'20px'}}>
                        <Grid item xs={12} md={12} height="20px" style={{color:'black', fontSize:"20px", marginBottom:'8px', fontWeight: '800',}}>
                            { server.servername}
                        </Grid>
                        <Grid item xs={12} md={12} height="15px" style={{color:'black', fontSize:"14px"}}>
                        {server.currentPlayers}/{server.maxPlayer} playing now
                            
                                
                                
                        </Grid>
                        <Grid item xs={12} md={12} height="15px" style={{color:'black', fontSize:"14px"}}>
                            { server.serverVersion}
                        </Grid>
                    </div>
                    
                    
                </Grid>
                <Grid item xs={2} md={2} style={{ backgroundColor: '#292826', textAlign: 'center'}}>
                    <Grid item xs={12} md={12} style={{ backgroundColor: '#292826', height: '50%', textAlign: 'center', fontSize:"14px", paddingTop:'20px'}}>
                        {server.ip}
                    </Grid>
                    <Grid item xs={12} md={12} style={
                        {
                            backgroundColor: '#128f0b',
                            height: '50%',
                            textAlign: 'center',
                            fontSize:"18px", 
                            paddingTop:'18px',
                            fontStyle: 'bold',
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