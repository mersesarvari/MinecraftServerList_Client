import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { serverContext } from "../../App";

function ServerDetails() {
  const { id } = useParams();
  const context = useContext(serverContext);

  var currentServer = context.data.find((server) => server.id === id);

  return (
    <div className="about">
      <div>
        <h2>{currentServer.servername}</h2>
        <p>IP address: {currentServer.ip}</p>
        <p>
          IP Current Players: {currentServer.currentPlayers}/{" "}
          {currentServer.maxPlayer}
        </p>
      </div>
    </div>
  );
}

export default ServerDetails;
