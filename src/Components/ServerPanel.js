import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SERVERIP } from "../LOCAL";

const ServerPanel = (props) => {
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
        height: { xs: "230px", sm: "120px" },
        marginTop: { xs: "15px", sm: "20px" },
        marginBottom: { xs: "px", sm: "20px" },
      }}
    >
      {/* Grid 1 - Logo*/}
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
      {/* Grid 5 - Video*/}
      <Grid
        item
        xs={12}
        sm={5}
        sx={{
          backgroundColor: "white",
          color: "black",
          padding: "0px",
          margin: "0",
          display: { xs: "none", sm: "block" },
          height: { sm: "100%", xs: "60%" },
          marginTop: { xs: "0px" },
        }}
        onClick={() => {
          navigate("server/" + props.server.id);
        }}
      >
        <video
          style={{ height: "50%", width: "90%", margin: "30px 20px" }}
          sx={{
            width: { xs: "100%" },
            margin: { xs: "0px" },
            padding: { xs: "0px" },
          }}
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
      {/* Grid 4 - Information*/}
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
          sx={{
            textAlign: { xs: "center", sm: "left" },
            height: { xs: "30px" },
          }}
        >
          <Typography
            noWrap
            sx={{ fontWeight: { xs: "700" }, fontSize: { xs: "20px" } }}
          >
            {props.server.servername}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          height="15px"
          style={{ color: "black", fontSize: "14px" }}
        >
          <Typography noWrap>
            {props.server.currentPlayers}/{props.server.maxPlayer} playing now
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          height="15px"
          style={{ color: "black", fontSize: "14px" }}
        >
          <Typography noWrap>{props.server.serverVersion}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          height="15px"
          style={{ color: "black", fontSize: "14px" }}
        ></Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          <video
            style={{ height: "50%", width: "100%" }}
            sx={{
              width: { xs: "100%" },
              margin: { xs: "0px" },
              padding: { xs: "0px" },
              display: { xs: "block", sm: "none" },
            }}
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
      </Grid>
      {/* Grid 2 - Ipaddress */}
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
          <Typography noWrap>COPY</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ServerPanel;
