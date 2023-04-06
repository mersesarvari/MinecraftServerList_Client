import { useEffect, useState, useRef } from "react";
import Server from "../Components/Servers";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
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
        <Grid
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
          style={{
            marginBottom: "20px",
            backgroundColor: "#292826",
            height: "50px",
          }}
          sx={{
            display: { xs: "none", sm: "block" },
            marginTop: { sm: "20px" },
          }}
        >
          <Typography>Premium servers</Typography>
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: "10px" }}>
          <Server
            servers={context.data.filter((server) => server.premium === true)}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            md={12}
            alignItems="center"
            justifyContent="center"
            style={{
              marginBottom: "20px",
              backgroundColor: "#292826",
              height: "50px",
            }}
            sx={{
              display: { xs: "none", sm: "block" },
              marginTop: { sm: "20px" },
            }}
          >
            <Typography>Premium servers</Typography>
          </Grid>
          <Server servers={context.data} />
        </Grid>
      </Grid>
    </div>
  );
}
