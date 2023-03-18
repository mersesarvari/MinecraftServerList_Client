import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Step from "@mui/material/Step";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { SERVERIP, CheckLogin, categories, servertypes } from "../../LOCAL";
import { useFormik } from "formik";
import { CreateServerScheme } from "../../validations/ValidationSchemes";
import {
  IconButton,
  StepLabel,
  Stepper,
  Tabs,
  Tab,
  Typography,
  StepContent,
  Paper,
  Chip,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import NavForm from "../../Components/navigationform";

// icons

//Components
import CountryAutoselect from "../../Components/CountryAutoselect";
import SelectServerCategory from "../../Components/SelectServerCategory";
import SelectMultipleItem from "../../Components/SelectMultipleItem";

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
  const top100Films = [
    { title: "java", year: 1994 },
    { title: "bedrock", year: 1972 },
  ];
  const pages = ["details", "description", "social"];
  const [active, setActive] = useState(pages[0]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (CheckLogin() !== true) {
      navigate("/");
    }
  });

  function Next() {
    //Ha az utolsó oldalon vagyunk
    if (active === pages[pages.length - 1]) {
      //Submitted
      alert("Az uutolsó oldalon vagyunk. jöhet a mentés");
      return;
    }
    setActive(pages[pages.indexOf(active) + 1]);
  }
  function Previous() {
    //Ha az utolsó oldalon vagyunk
    if (active === pages[0]) {
      //Submitted
      alert("Az első oldalon vagyunk. innen nincsen visszalépés");
      return;
    }
    setActive(pages[pages.indexOf(active) - 1]);
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
                // https://colorlib.com/wp/free-bootstrap-wizards/
                active === pages[0] && (
                  <>
                    <Details
                      next={() => Next()}
                      previous={() => Previous()}
                      list={servertypes}
                    />
                  </>
                )
              }
              {active === pages[1] && (
                <>
                  <Description
                    next={() => Next()}
                    previous={() => Previous()}
                  />
                </>
              )}
              {active === pages[2] && (
                <>
                  <Social next={() => Next()} previous={() => Previous()} />
                </>
              )}
            </Container>
          </ThemeProvider>
        </>
      }
    </div>
  );
}

const Details = (props) => {
  const fixedOptions = [];
  const [value, setValue] = React.useState([]);
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
            <CountryAutoselect />
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
const Description = (props) => {
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
          <Button onClick={() => props.previous()} variant="contained">
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
const Social = (props) => {
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
            <Button variant="contained" onClick={() => props.previous()}>
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
