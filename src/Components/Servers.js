import Grid from "@mui/material/Grid";
import { fontWeight } from "@mui/system";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SERVERIP } from "../LOCAL";

const Servers = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      {props.servers &&
        props.servers.map((server) => (
          <Grid
            container
            spacing={0}
            height="120px"
            key={server.id}
            style={{
              backgroundColor: "#292826",
              marginBottom: "15px",
              color: "black",
            }}
          >
            <Grid item xs={1} md={1} height="120px">
              <img
                src={SERVERIP + "logo?id=" + server.id}
                alt="server logo"
                style={{ margin: "30px 15px", width: "60px", height: "60px" }}
              />
            </Grid>
            <Grid
              item
              xs={5}
              md={5}
              style={{
                backgroundColor: "white",
                color: "black",
                padding: "0",
                margin: "0",
                height: "120px",
              }}
              onClick={() => {
                navigate("server/" + server.id);
              }}
            >
              <video
                style={{ height: "60px", margin: "30px 20px" }}
                autoPlay
                playsInline
                loop
                muted
                alt="All the devices"
                src={SERVERIP + "thumbnail?id=" + server.id}
              />
            </Grid>
            <Grid
              item
              xs={4}
              md={4}
              style={{ backgroundColor: "white", color: "black" }}
              onClick={() => {
                navigate("server/" + server.id);
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  color: "black",
                  whiteSpace: "nowrap",
                  marginTop: "20px",
                }}
              >
                <Grid
                  item
                  xs={12}
                  md={12}
                  height="20px"
                  style={{
                    color: "black",
                    fontSize: "20px",
                    marginBottom: "8px",
                    fontWeight: "800",
                  }}
                >
                  {server.servername}
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  height="15px"
                  style={{ color: "black", fontSize: "14px" }}
                >
                  {server.currentPlayers}/{server.maxPlayer} playing now
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  height="15px"
                  style={{ color: "black", fontSize: "14px" }}
                >
                  {server.serverVersion}
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  height="15px"
                  style={{ color: "black", fontSize: "14px" }}
                ></Grid>
              </div>
            </Grid>
            <Grid
              item
              xs={2}
              md={2}
              style={{ backgroundColor: "#292826", textAlign: "center" }}
            >
              <Grid
                item
                xs={12}
                md={12}
                style={{
                  backgroundColor: "#292826",
                  height: "50%",
                  textAlign: "center",
                  fontSize: "14px",
                  paddingTop: "20px",
                }}
              >
                <div style={{ fontWeight: "560", color: "white" }}>
                  {server.javaIp !== "" && server.javaIp}
                  {server.javaIp === "" && server.bedrockIp}
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                style={{
                  backgroundColor: "#128f0b",
                  height: "50%",
                  textAlign: "center",
                  fontSize: "18px",
                  paddingTop: "18px",
                  fontStyle: "bold",
                }}
              >
                COPY
              </Grid>
            </Grid>
          </Grid>
        ))}
    </div>
  );
};

export default Servers;
