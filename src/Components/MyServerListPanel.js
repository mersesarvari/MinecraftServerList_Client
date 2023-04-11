import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Server from "../Classes/Server";
import { SERVERIP } from "../LOCAL";

const MyServerListPanel = (props) => {
  return (
    <>
      {props.servers &&
        props.servers.map((server) => (
          <ServerPanel key={server.id} server={server} />
        ))}
    </>
  );
};

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
        height: { xs: "230px", sm: "110px" },
        marginTop: { xs: "13px", sm: "18px" },
        marginBottom: { xs: "13px", sm: "18px" },
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
      {/* Grid 6 - Video*/}
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          backgroundColor: "white",
          color: "black",
          padding: "25px 15px",
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
          style={{ width: "100%" }}
          sx={{
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
      {/* Grid 3 - Information*/}
      <Grid
        item
        xs={12}
        sm={3}
        style={{
          backgroundColor: "white",
          color: "black",
          padding: "25px 0",
        }}
        sx={{
          height: { xs: "80%", sm: "100%" },
          padding: { xs: "0%" },
        }}
        onClick={() => {
          navigate("server/" + props.server.id);
        }}
      >
        <Typography
          noWrap
          m={0}
          style={{ fontSize: "17px", fontWeight: "600" }}
        >
          {props.server.servername}
        </Typography>
        <Typography noWrap m={0}>
          {props.server.currentPlayers}/{props.server.maxPlayer} playing now
        </Typography>
        <Typography noWrap m={0}>
          {props.server.serverVersion}
        </Typography>
        <Grid
          item
          xs={12}
          sm={0}
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          <video
            style={{ height: "100%", width: "100%" }}
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
            backgroundColor: "white",
            textAlign: "center",
            fontSize: "14px",
            paddingTop: "10px",
            fontWeight: "560",
            color: "white",
          }}
          sx={{
            display: { xs: "none", sm: "block" },
            height: { xs: "0px", sm: "50%" },
          }}
        >
          <Button
            variant="contained"
            style={{ width: "80%" }}
            onClick={() => {
              navigate(`/modifyserver/${props.server.id}`);
            }}
          >
            MODIFY
          </Button>
        </Grid>
        <Grid
          item
          sm={12}
          xs={12}
          style={{
            backgroundColor: "white",
            textAlign: "center",
            fontSize: "18px",
            paddingTop: "10px",
            fontWeight: "800",
          }}
          sx={{
            paddingTop: { xs: "0px", sm: "50%" },
            height: { xs: "100%", sm: "50%" },
          }}
        >
          <DeleteDialog serverid={props.server.id} />
        </Grid>
      </Grid>
    </Grid>
  );
};
export function DeleteDialog(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ width: "80%" }}
        variant="contained"
        color="error"
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Server deleting confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            id: {props.serverid + " "}
            Are you sure that you want to delete this server? After the delete,
            you cannot undo this change. Please confirm if you want to remove
            this server from our system!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
              Server.deleteServer(props.serverid);
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default MyServerListPanel;
