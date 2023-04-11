import { useEffect, useState, useRef } from "react";
import MyServerList from "../Components/MyServerListPanel";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { serverContext } from "../App";
import Auth from "../Classes/Auth";

export default function MyServers() {
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
    <div className="myservers">
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
        <MyServerList
          servers={context.data.filter(
            (server) => server.publisherid === Auth.getUserId()
          )}
        />
      </Grid>
    </div>
  );
}
