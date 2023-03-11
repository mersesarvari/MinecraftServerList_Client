import * as React from 'react';
import { useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Cookies from 'js-cookie';
import {
  Outlet,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from 'react-router-dom';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function CheckLogin() {
  let email = Cookies.get('email');
  let pwd = Cookies.get('password');
  console.log(email +"|"+ pwd);
  if (email !== undefined && pwd !== undefined) {
      
      return true;
  } else return false;
}

const Navigation = () => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);



    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const NavItems =()=>{
      if (CheckLogin()) {
          return (
            <>
            <MenuItem>
            <Typography textAlign="center" onClick={()=>{navigate('')}}>Home</Typography>
            </MenuItem>
            <MenuItem>
            <Typography textAlign="center" onClick={()=>{navigate('')}}>Szerverek</Typography>
            </MenuItem>
            <MenuItem>
            <Typography textAlign="center" onClick={()=>{navigate('rangsor')}}>Rangsor</Typography>
            </MenuItem>
            <MenuItem>
            <Typography textAlign="center" onClick={()=>{navigate('logout')}}>Kilépés</Typography>
            </MenuItem>
            </>
          )
      }
      else {
          return (
                <>
                  <MenuItem>
                  <Typography textAlign="center" onClick={()=>{navigate('')}}>Home</Typography>
                  </MenuItem>
                  <MenuItem>
                  <Typography textAlign="center" onClick={()=>{navigate('')}}>Szerverek</Typography>
                  </MenuItem>
                  <MenuItem>
                  <Typography textAlign="center" onClick={()=>{navigate('rangsor')}}>Rangsor</Typography>
                  </MenuItem>
                  </>
          ) 
      }
    };
    const ProfilePanel =()=>{
        if (CheckLogin()) {
          return (
            <>
                  <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                              </IconButton>
                            </Tooltip>
                            <Menu
                              sx={{ mt: '45px' }}
                              id="menu-appbar"
                              anchorEl={anchorElUser}
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              keepMounted
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              open={Boolean(anchorElUser)}
                              onClose={handleCloseUserMenu}
                            >
                              {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                  <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                              ))}
                            </Menu>
                          </Box>
                  </>            
          )
      }
      else {
          return (
            <>
            <MenuItem>
            <Typography textAlign="center" onClick={()=>{navigate('login')}}>Belépés</Typography>
            </MenuItem>
            <MenuItem>
            <Typography textAlign="center" onClick={()=>{navigate('register')}}>Regisztráció</Typography>
            </MenuItem>
            </>
          ) }
    };
      
    return (
        <div>
            {
                <AppBar position="static" style={{backgroundColor:'#292826'}}>
                <Container maxWidth="xl">
                  <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      href="/"
                      sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      MCMania
                    </Typography>
          
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                          display: { xs: 'block', md: 'none' },
                        }}
                      >
                         <NavItems />
                      </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    
                    <Typography
                      variant="h5"
                      noWrap
                      component="a"
                      href=""
                      sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      MCServers
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                      <NavItems/>
                    </Box>
                      {/* Login rész és logo */}  
                      <ProfilePanel />
                    
                  </Toolbar>
                </Container>
              </AppBar>
            }
        </div>
    )
}

export default Navigation;