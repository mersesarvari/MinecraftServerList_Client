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
    Routes,
    Route,
    NavLink,
    useNavigate,
} from 'react-router-dom';



export default function Logout() {
    const navigate = useNavigate();

    function Logout() {
        useEffect(() => {
            Cookies.remove('email');
            Cookies.remove('password');
            console.log('You succesfully logged out');
            navigate('/login');
            window.location.reload(false);
        });
        
    }


    function CheckLogin() {
        let email = Cookies.get('email');
        let pwd = Cookies.get('password');
        if (email !== undefined && pwd !== undefined) {
            return true;
        } else return false;
    }

    return (
        <div>
            {
                Logout() && navigate('/login')
            }
        </div>
    );
}