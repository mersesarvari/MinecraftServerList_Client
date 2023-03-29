import * as React from "react";
import { RegistrationScheme } from "../validations/ValidationSchemes";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik, withFormik } from "formik";
import { SERVERIP } from "../LOCAL.js";

import "../style/css/index.css";
import Auth from "../Auth";
const theme = createTheme();
const fieldTheme = {
  backgroundColor: "#383636",
  color: "white",
};

const onSubmit = async (values, actions) => {
  Auth.Register();
};

export default function RegisterForm() {
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
    validationSchema: RegistrationScheme,
    onSubmit,
  });
  //console.log(errors);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ color: "black" }}>
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={values.email}
                  onChange={handleChange}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  className={errors.email && touched.email ? "input-error" : ""}
                />
                {errors.email && touched.email && (
                  <p className="error">{errors.email}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={values.password}
                  onChange={handleChange}
                  className={
                    errors.password && touched.password ? "input-error" : ""
                  }
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {errors.password && touched.password && (
                  <p className="error">{errors.password}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={values.confirmpassword}
                  onChange={handleChange}
                  className={
                    errors.confirmpassword && touched.confirmpassword
                      ? "input-error"
                      : ""
                  }
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                />
                {errors.confirmpassword && touched.confirmpassword && (
                  <p className="error">{errors.confirmpassword}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
