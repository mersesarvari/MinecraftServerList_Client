import axios from "axios";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

if (servers) {
    servers.map((server) => (
        import server.id from ''
    ));
    
}



export default function Home() {
    const [url, setURL] = useState('E:\\Programing\\MinecraftServerList\\Resources\\Files\\ServerThumbnails\\');
    const [servers, setServers] = useState(null);


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
            <h2>Welcome to server information:</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Server Address</TableCell>
                            <TableCell align="right">Server status</TableCell>
                            <TableCell align="right">Version</TableCell>
                            <TableCell align="right">Players</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {servers && servers.map((server) => (
                            <TableRow
                                key={server.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="server">
                                    {server.ip}
                                </TableCell>
                                
                                <TableCell align="right">{getserverStatus(server.status)}

                                </TableCell>
                                <TableCell align="right">{server.serverVersion}
                                </TableCell>
                                <TableCell align="right">{server.currentPlayers}/{server.maxPlayer}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}