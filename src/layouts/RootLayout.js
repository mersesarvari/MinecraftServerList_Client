import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function RootLayout() {
  return (
    <>
    
    <div className="root-layout" style={{paddingTop:"150px", paddingLeft:"240px",display:"block"}}>
      <Box sx={{ display: 'flex' }}>
        <Navigation />
      </Box>
      <Outlet />
    </div>
    
    </>
  );
}
