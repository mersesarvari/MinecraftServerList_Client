import Grid from "@mui/material/Grid";
import { fontWeight } from "@mui/system";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SERVERIP } from "../LOCAL";
import Server from "./Server";

const Servers = (props) => {
  const navigate = useNavigate();

  return (
    <>
      {props.servers &&
        props.servers.map((server) => (
          <Server key={server.id} server={server} />
        ))}
    </>
  );
};

export default Servers;
