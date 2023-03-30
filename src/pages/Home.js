import { useEffect, useState, useRef } from "react";
import Server from "../Components/Servers";
import Grid from "@mui/material/Grid";
import { useLoaderData } from "react-router-dom";

export default function Home() {
  const videoEl = useRef(null);
  const [loaded, setloaded] = useState(false);
  const serverlist = useLoaderData();

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
      <Grid container spacing={0} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={12}>
          Premium servers
          <Server servers={serverlist} />
        </Grid>
        <Grid item xs={12} md={12}>
          Minecraft servers
          <Server servers={serverlist} />
        </Grid>
      </Grid>
    </div>
  );
}
