﻿import { useEffect, useState, useRef } from "react";
import ServerList from "../Components/ServerListPanel";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { serverContext } from "../App";

export default function Home() {
  const videoEl = useRef(null);
  const [loaded, setloaded] = useState(false);
  const context = useContext(serverContext);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, [loaded]);

  return (
    <div className="home">
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        sx={{
          padding: { lg: "0px 200px", md: "0px 40px", xs: "0px 10px" },
          paddingTop: { md: "60px" },
        }}
      >
        <ServerList
          servers={context.data.filter((server) => server.premium === true)}
        />
        <ServerList
          servers={context.data.filter((server) => server.premium === false)}
        />
      </Grid>
    </div>
  );
}
