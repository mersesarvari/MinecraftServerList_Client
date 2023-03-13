import { useParams, useLoaderData } from "react-router-dom";
import axios from "axios";
import { SERVERIP } from "../../LOCAL";
import { CollectionsBookmarkOutlined } from "@mui/icons-material";

function ServerDetails() {
    const {id} = useParams();
    const server = useLoaderData();

    return (
        
        <div className="about">
            <div>
                <h2>{server.servername}</h2>
                <p>
                    IP address: {server.ip}
                </p>
                <p>
                    IP Current Players: {server.currentPlayers}/ {server.maxPlayer}
                </p>
                
                </div>
        </div>
    )
}

export default ServerDetails;