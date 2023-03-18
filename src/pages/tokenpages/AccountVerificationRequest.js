import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    useParams, useLoaderData
} from 'react-router-dom';
import { SERVERIP } from '../../LOCAL';


const theme = createTheme();

export default function AccountVerification() {
    const {token} = useParams();
    const serverlist = useLoaderData();
    console.log(serverlist);
    return(
        <div>
            Account verification page:
            {serverlist}
        </div>
    );
}