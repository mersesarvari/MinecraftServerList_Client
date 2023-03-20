import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { SERVERIP, CheckLogin, servertypes, categories } from "../LOCAL";
import { useFormik } from "formik";
import { CreateServerScheme } from "../validations/ValidationSchemes";
import NavForm from "../Components/navigationform";

import { ServerContext } from "../contexts/ServerContext";
import { Autocomplete, Box, Grid, IconButton, TextField } from "@mui/material";
import CountrySelect from "../Components/CountrySelect";
import { Button } from "bootstrap";
import SelectMultipleItem from "../Components/SelectMultipleItem";
import { PhotoCamera } from "@mui/icons-material";

const theme = createTheme();

const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);
  try {
    let loginObject = {
      Email: values.email,
      Password: values.password,
    };
    const response = await axios.post(`${SERVERIP}login`, loginObject);
    alert(response.data);
    Cookies.set("email", loginObject.Email, { expires: 7 });
    Cookies.set("password", loginObject.Password, { expires: 7 });

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
  const server = React.useContext(ServerContext);

  const top100Films = [
    { title: "java", year: 1994 },
    { title: "bedrock", year: 1972 },
  ];
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const steps = ["details", "descriptions", "social"];
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (CheckLogin() !== true) {
      navigate("/");
    }
  });

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }
  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      i = i - 1;
    });
  }
  function goto(index) {
    setCurrentStepIndex(index);
  }

  return (
    <div>
      {
        <>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <NavForm />
              <CssBaseline />
              {
                <>
                  <ServerDetailsForm
                    next={next()}
                    back={back()}
                  ></ServerDetailsForm>
                </>
              }
              {currentStepIndex === 2 && <></>}
              {currentStepIndex === 3 && <></>}
            </Container>
          </ThemeProvider>
        </>
      }
    </div>
  );
}
const ServerDetailsForm = (props) => {
  const fixedOptions = [];
  const [value, setValue] = useState([]);
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={props.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Server name" id="fullWidth" />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="fixed-tags-demo"
              value={value}
              onChange={(event, newValue) => {
                setValue([
                  ...newValue.filter(
                    (option) => fixedOptions.indexOf(option) === -1
                  ),
                ]);
              }}
              options={props.list}
              getOptionLabel={(option) => option}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Server type(s)"
                  placeholder="select server types"
                />
              )}
            />
          </Grid>

          {value.includes("java") && (
            <>
              <Grid item xs={7}>
                <TextField fullWidth label="Java server ip" />
              </Grid>
              <Grid item xs={5}>
                <TextField fullWidth defaultValue="25565" />
              </Grid>
            </>
          )}

          {value.includes("bedrock") && (
            <>
              <Grid item xs={7}>
                <TextField fullWidth label="Bedrock server ip" />
              </Grid>
              <Grid item xs={5}>
                <TextField defaultValue={19132} />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <CountrySelect />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={() => props.next()}>
              continue
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
const ServerDescriptionForm = (props) => {
  return (
    <Box
      component="form"
      onSubmit={props.handleSubmit}
      noValidate
      sx={{ mt: 1 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button variant="contained" component="label">
            Upload Server icon
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <TextField type="file" />

          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="Short description" />
        </Grid>

        <Grid item xs={12}>
          <TextField multiline minRows={8} fullWidth label="Description" />
        </Grid>
        <Grid item xs={12}>
          <SelectMultipleItem fullWidth list={categories} />
        </Grid>
        <Grid item xs={2}>
          <Button onClick={() => props.back()} variant="contained">
            Previous
          </Button>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={4}>
          <Button onClick={() => props.next()} variant="contained">
            continue
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
const ServerSocialForm = (props) => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={props.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Discord link" id="fullWidth" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Youtube intro link" id="fullWidth" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Website" id="fullWidth" />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={() => props.back()}>
              previous
            </Button>
          </Grid>
          <Grid item xs={7}></Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={() => props.next()}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
