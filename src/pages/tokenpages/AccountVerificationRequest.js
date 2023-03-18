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
    console.log(serverlist);
    return(
        <div>
            {serverlist}
        </div>
    );
}