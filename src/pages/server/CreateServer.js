import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
import { Form, useNavigate } from "react-router-dom";
import { SERVERIP, CheckLogin } from "../../LOCAL";
import { Field, Formik, useFormik } from "formik";
import {
  CreateServerScheme,
  ServerFormScheme,
} from "../../validations/ValidationSchemes";
import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import NavForm from "../../Components/navigationform";

// icons

//Components
import CountryAutoSelect from "../../Components/CountryAutoSelect";
import SelectServerCategory from "../../Components/SelectServerCategory";
import { UserContext } from "../../contexts/UserContext";

const theme = createTheme();

const StepOne = () => {
  return (
    <Formik>
      {() => (
        <Form>
          <p>Server Name</p>
          <Field name="servername" />
          <p>Server server type</p>
          <Field name="servertypes" />
          <p>Server java ip</p>
          <Field name="servername" />
        </Form>
      )}
    </Formik>
  );
};

export default function CreateServer() {
  const FormTitle = ["Details", "Description", "Social"];
  const [page, setPage] = useState(0);
  const [types, setTypes] = useState([]);

  const [data, setData] = useState({
    servername: "",
    servertypes: [],
    serverjavaip: "",
    serverjavaport: "25565",
    serverbedrockip: "",
    serverbedrockport: "19132",
    servercountry: "",
    serverthumbnail: "",
    servericon: "",
    servershortdescription: "",
    serverlongdescription: "",
    serverdiscordlink: "",
    serveryoutubelink: "",
    serverwebsitelink: "",
  });

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
  };
  const Proba = () => {
    return (
      <Formik>
        <Form
          initialValues={{
            servername: "",
            servertypes: [],
            serverjavaip: "",
            serverjavaport: "25565",
            serverbedrockip: "",
            serverbedrockport: "19132",
            servercountry: "",
            serverthumbnail: "",
            servericon: "",
            servershortdescription: "",
            serverlongdescription: "",
            serverdiscordlink: "",
            serveryoutubelink: "",
            serverwebsitelink: "",
          }}
        >
          <Field name="servername" component={TextField} label="Server Name" />
          <Field
            name="servername"
            component={Autocomplete}
            label="Server Name"
          />
          <Field name="servername" component={TextField} label="Server Name" />
          <Field name="servername" component={TextField} label="Server Name" />
          <Field name="servername" component={TextField} label="Server Name" />
        </Form>
      </Formik>
    );
  };
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
      servername: "",
      servertypes: "",
      serverjavaip: "",
      serverjavaport: "",
      serverbedrockip: "",
      serverbedrockport: "",
      servercountry: "",
      serverthumbnail: "",
      servericon: "",
      servershortdescription: "",
      serverlongdescription: "",
      serverdiscordlink: "",
      serveryoutubelink: "",
      serverwebsitelink: "",
    },
    validationSchema: ServerFormScheme,
    onSubmit,
  });
  const navigate = useNavigate();

  const Details = ({ formData, setFormData, next, previous, list }, props) => {
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Server name"
                id="fullWidth"
                name="Server name"
                autoComplete="Server name"
                value={values.servername}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.servername && touched.servername ? "input-error" : ""
                }
              />
              {errors.servername && touched.servername && (
                <p className="error">{errors.servername}</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="fixed-tags-demo"
                //value={value}
                onChange={(event, newValue) => {
                  setValue([
                    ...newValue.filter(
                      (option) => fixedOptions.indexOf(option) === -1
                    ),
                  ]);
                }}
                options={list}
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
                  <TextField
                    fullWidth
                    label="Java server ip"
                    value={values.serverjavaip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.serverjavaip && touched.serverjavaip
                        ? "input-error"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField fullWidth />
                </Grid>
              </>
            )}

            {value.includes("bedrock") && (
              <>
                <Grid item xs={7}>
                  <TextField
                    fullWidth
                    label="Bedrock server ip"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        serverbedrockip: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        serverbedrockport: event.target.value,
                      })
                    }
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <CountryAutoSelect />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={4}>
              <Button variant="contained" onClick={() => next()}>
                continue
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };
  const Description = ({ formData, setFormData, next, previous }, props) => {
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
          <Grid item xs={2}>
            <Button onClick={() => previous()} variant="contained">
              Previous
            </Button>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={4}>
            <Button onClick={() => next()} variant="contained">
              continue
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  };
  const Social = ({ formData, setFormData, next, previous }, props) => {
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
              <Button variant="contained" onClick={() => previous()}>
                previous
              </Button>
            </Grid>
            <Grid item xs={7}></Grid>
            <Grid item xs={3}>
              <Button variant="contained" onClick={() => next()}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };
  const top100Films = [
    { title: "java", year: 1994 },
    { title: "bedrock", year: 1972 },
  ];
  useEffect(() => {
    if (CheckLogin() !== true) {
      //navigate("/");
    }
  });

  function Next() {
    //Ha az utolsó oldalon vagyunk
    if (page >= FormTitle.length - 1) return;
    return setPage(page + 1);
  }
  function Previous() {
    //Ha az utolsó oldalon vagyunk
    if (page <= 0) return;
    return setPage(page - 1);
  }
  const PageDisplay = () => {
    if (page === 0)
      return (
        <Details
          next={() => Next()}
          previous={() => Previous()}
          list={["java", "bedrock"]}
          //formData={formData}
          //setFormData={setFormData}
        />
      );
    if (page === 1)
      return (
        <Description
          next={() => Next()}
          previous={() => Previous()}
          //formData={formData}
          //setFormData={setFormData}
        />
      );
    if (page === 2)
      return (
        <Social
          next={() => Next()}
          previous={() => Previous()}
          //formData={formData}
          //setFormData={setFormData}
        />
      );
  };
  return (
    <div>
      {
        <>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <NavForm />
              <CssBaseline />
              {<PageDisplay />}
            </Container>
          </ThemeProvider>
        </>
      }
    </div>
  );
}
