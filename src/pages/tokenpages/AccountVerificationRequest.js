import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    useNavigate, useParams, Outlet, useLoaderData
} from 'react-router-dom';
import { SERVERIP } from '../../LOCAL';


const theme = createTheme();

export default function AccountVerification() {
    const {token} = useParams();
    const serverlist = useLoaderData();
    useEffect(() => {
        console.log("Trying to activate your account")
        if(token===undefined)
        {
            navigate("/");
        }
        //AccountVerificationRequest();
    });

    const navigate = useNavigate();

    async function AccountVerificationRequest() {
        try {
            
        } catch (error) {
            console.error(error);
            alert(error.request.response);
            navigate('register');
        }
    }
    return (
        <div>
            <h1>Verification page</h1>
            {serverlist.data}
            <Outlet/>
        </div>
        
    );
}