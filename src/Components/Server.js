import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SERVERIP } from "../LOCAL";

const Server = (props) => {
  const navigate = useNavigate();
  return (
    <Grid
      item
      xs={12}
      container
      spacing={0}
      key={props.server.id}
      sx={{
        backgroundColor: "red",
        color: "black",
        height: { xs: "200px", sm: "120px" },
        marginTop: { xs: "15px", sm: "20px" },
      }}
    >
      <Grid
        item
        xs={1}
        sx={{
          display: { xs: "none", sm: "block" },
          backgroundColor: "#292826",
          height: { sm: "100%" },
        }}
      >
        <img
          src={SERVERIP + "Files/ServerLogos/" + props.server.logoPath}
          alt="server logo"
          style={{ margin: "30px 20px", width: "60%" }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={5}
        sx={{
          backgroundColor: "white",
          color: "black",
          padding: "0",
          margin: "0",
          display: { xs: "none", sm: "block" },
          height: { sm: "100%" },
        }}
        onClick={() => {
          navigate("server/" + props.server.id);
        }}
      >
        <video
          style={{ height: "50%", width: "90%", margin: "30px 20px" }}
          autoPlay
          playsInline
          loop
          muted
          alt="All the devices"
          src={
            SERVERIP + "Files/ServerThumbnails/" + props.server.thumbnailPath
          }
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        style={{ backgroundColor: "white", color: "black" }}
        sx={{
          height: { xs: "80%", sm: "100%" },
        }}
        onClick={() => {
          navigate("server/" + props.server.id);
        }}
      >
        <Grid
          item
          xs={12}
          height="20px"
          style={{
            color: "black",
            fontSize: "20px",
            marginBottom: "8px",
            fontWeight: "800",
          }}
        >
          {props.server.servername}
        </Grid>
        <Grid
          item
          xs={12}
          height="15px"
          style={{ color: "black", fontSize: "14px" }}
        >
          {props.server.currentPlayers}/{props.server.maxPlayer} playing now
        </Grid>
        <Grid
          item
          xs={12}
          height="15px"
          style={{ color: "black", fontSize: "14px" }}
        >
          {props.server.serverVersion}
        </Grid>
        <Grid
          item
          xs={12}
          height="15px"
          style={{ color: "black", fontSize: "14px" }}
        ></Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={2}
        style={{ backgroundColor: "#292826", textAlign: "center" }}
        sx={{
          height: { xs: "20%", sm: "100%" },
        }}
      >
        <Grid
          item
          sm={12}
          xs={12}
          style={{
            backgroundColor: "#292826",
            textAlign: "center",
            fontSize: "14px",
            paddingTop: "20px",
            fontWeight: "560",
            color: "white",
          }}
          sx={{
            display: { xs: "none", sm: "block" },
            height: { xs: "0px", sm: "50%" },
          }}
        >
          <Typography noWrap>
            {props.server.javaIp !== "" && props.server.javaIp}
            {props.server.javaIp === "" && props.server.bedrockIp}
          </Typography>
        </Grid>
        <Grid
          item
          sm={12}
          xs={12}
          style={{
            backgroundColor: "#128f0b",
            textAlign: "center",
            fontSize: "18px",
            paddingTop: "15px",
            fontWeight: "800",
          }}
          sx={{
            paddingTop: { xs: "0px", sm: "50%" },
            height: { xs: "100%", sm: "50%" },
          }}
        >
          COPY
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Server;
