import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import {
    useNavigate, useParams, Outlet
} from 'react-router-dom';
import { SERVERIP } from '../../LOCAL';

const theme = createTheme();

export default function NewPasswordRequest() {
    const {token} = useParams();

    const navigate = useNavigate();
    useEffect(() => {
        console.log(token)
        if(token===undefined)
        {
            navigate("/");
        }
    });
    
    

    async function ResetRequest(password, confirmPassword) {
        try {
            console.log(password);
            console.log(confirmPassword);
            const passwords ={ password,confirmPassword };

            const response = await axios.post(`${SERVERIP}resetpassword/`,{
                Token: token,
                Password: password,
                ConfirmPassword: confirmPassword
              }
            );
            console.log(response);
            if(response.status === 200)
            {
                console.log("response status was 200");
            }
            navigate("/");

            
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let pwd = data.get('password');
        let cfmpwd = data.get('confirmpassword');
        ResetRequest(pwd,cfmpwd);

    };
    return (
        <div>
            {
                <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" style={{color:'black'}}>
                            Password Restoration
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmpassword"
                                label="Confirm password"
                                type="password"
                                id="confirmpassword"
                                autoComplete="Password again"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Change Password
                            </Button>
                        </Box>
                    </Box>
                </Container >
                </ThemeProvider>
            }
            <Outlet/>
        </div>
        
    );
}