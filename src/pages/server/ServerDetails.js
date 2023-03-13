import { useParams, useLoaderData } from "react-router-dom";

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