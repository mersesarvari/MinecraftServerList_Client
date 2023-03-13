import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    useNavigate, useParams, Outlet
} from 'react-router-dom';
import { SERVERIP } from '../../LOCAL';


const theme = createTheme();

export default function AccountVerification() {
    const {token} = useParams();
    useEffect(() => {
        console.log("Trying to activate your account")
        if(token===undefined)
        {
            navigate("/");
        }
        AccountVerificationRequest();
    });

    const navigate = useNavigate();

    async function AccountVerificationRequest() {
        try {
            const response = await axios.post(`${SERVERIP}verify?token=${token}`);
            console.log("response status was 200");
            console.log("Account verified");
            navigate('login');
        } catch (error) {
            console.error(error);
            alert(error.request.response);
            navigate('register');
        }
    }
    return (
        <div>
            <h1>Verification page</h1>
            <Outlet/>
        </div>
        
    );
}