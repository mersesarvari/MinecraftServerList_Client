import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    useNavigate, useParams, Outlet
} from 'react-router-dom';


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
            const response = await axios.post(`https://localhost:7296/verify?token=${token}`);
            console.log(response);
            if(response.status === 200)
            {
                console.log("response status was 200");
                console.log("Account verified");
                navigate('login');
                
            }
            //navigate("/");

            
        } catch (error) {
            console.error(error);
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