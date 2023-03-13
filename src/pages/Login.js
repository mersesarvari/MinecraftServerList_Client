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
import {useNavigate} from 'react-router-dom';
import { SERVERIP, CheckLogin } from '../LOCAL';
import { useFormik, withFormik } from "formik";
import {LoginScheme} from '../validations/ValidationSchemes';


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
export default function Login() {
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
        validationSchema: LoginScheme,
        onSubmit,
    });
    useEffect(() => {
        if (CheckLogin() === true) {
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" style={{color:'black'}}>
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.email && touched.email ? "input-error" : ""}
                            />
                            {errors.email && touched.email && <p className="error">{errors.email}</p>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.password && touched.email ? "input-error" : ""}
                            />
                            {errors.password && touched.password && (
                                <p className="error">{errors.password}</p>
                            )}
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="forgotpassword" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container >
                </ThemeProvider>
            }
        </div>
    );
}