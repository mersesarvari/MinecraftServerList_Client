import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import { SERVERIP, CheckLogin } from '../../LOCAL';
import { useFormik } from "formik";
import {CreateServerScheme} from '../../validations/ValidationSchemes';


const theme = createTheme();


const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    try {
        let loginObject={
            Email:values.email,
            Password: values.password,
        }
        const response = await axios.post(`${SERVERIP}login`,loginObject);
        alert(response.data);
        Cookies.set('email', loginObject.Email, { expires: 7 });
        Cookies.set('password', loginObject.Password, { expires: 7 });
        
        actions.resetForm();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
    } catch (error) {
        alert(error.request.response);
    }
    
};
export default function CreateServer() {
    const navigate = useNavigate();
    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
      } = useFormik({
        initialValues: {
          email: "",
          password: "",
          confirmpassword: "",
        },
        validationSchema: CreateServerScheme,
        onSubmit,
    });
    // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'Java edition', year: 1994 },
    { title: 'Bedrock Edition', year: 1972 },
  ];
    useEffect(() => {
        if (CheckLogin() !== true) {
            navigate("/");
        }

    });

    
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
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Server name" id="fullWidth" />
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField fullWidth label="Java server ip" />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField fullWidth defaultValue="25565"/>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField fullWidth label="Bedrock server ip" />
                                </Grid>
                                <Grid item xs={5}>

                                    <TextField defaultValue={19132} />
                                </Grid>
                                <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    limitTags={2}
                                    id="multiple-limit-tags"
                                    options={top100Films}
                                    getOptionLabel={(option) => option.title}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Server type" placeholder="Favorites" />
                                    )}
                                    sx={{ width: '500px' }}
                                />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField type="file" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField type="file" />
                                </Grid>

                                <Grid item xs={12} sx={{mt:'40px'}}>
                                    <TextField  
                                        multiline 
                                        rows={4}
                                        fullWidth
                                        label="Short description"
                                    />
                                </Grid>
                                

                                <Grid item xs={12} sx={{mt:'40px'}}>
                                    <TextField  
                                        multiline 
                                        rows={15}
                                        fullWidth
                                        label="Description"
                                    />
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Add Server
                                </Button>
                        </Grid>
                        </Box>
                        
                    </Box>
                </Container >
                </ThemeProvider>
            }
        </div>
    );
}