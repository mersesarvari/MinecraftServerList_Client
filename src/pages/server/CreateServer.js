import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik } from "formik";
import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import NavForm from "../../Components/navigationform";

// icons
//https://www.youtube.com/watch?v=C3hGMDVo_ec

//Components
import CountryAutoSelect from "../../Components/CountryAutoSelect";
import { ServerFormScheme } from "../../validations/ValidationSchemes";

const theme = createTheme();

export default function CreateServer() {
  const FormTitle = ["Details", "Description", "Social"];
  const [page, setPage] = useState(0);
  const serverTypes = ["java", "bedrock"];
  const [types, setTypes] = useState([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [errors, setErrors] = useState([]);

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

  const Details = ({ next, previous, list, formik }) => {
    const [java, setJava] = React.useState(false);
    const [bedrock, setBedrock] = React.useState(false);
    const handleJavaChange = (event) => {
      setJava(event.target.checked);
    };
    const handleBedrockChange = (event) => {
      setBedrock(event.target.checked);
    };
    const handleIpChange = () => {};
    return (
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
        }}
      >
        <Box onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Server name"
                name="servername"
                id="servername"
                value={formik.values.servername}
                onChange={formik.handleChange}
                error={
                  formik.touched.servername && Boolean(formik.errors.servername)
                }
                helperText={
                  formik.touched.servername && formik.errors.servername
                }
              />
            </Grid>
            <Grid item xd={6}>
              <FormControlLabel
                control={
                  <Checkbox id="javaCheck" onChange={handleJavaChange} />
                }
                label="java server"
              />
            </Grid>
            <Grid item xd={6}>
              <FormControlLabel
                control={<Checkbox onChange={handleBedrockChange} />}
                label="bedrock server"
              />
            </Grid>
            {
              <>
                <Grid item xs={7}>
                  <TextField
                    fullWidth
                    id="serverjavaip"
                    label="Java server ip"
                    value={formik.values.serverjavaip}
                    onChange={formik.handleChange}
                    onkeypress={handleIpChange}
                    disabled={!java}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    id="serverjavaport"
                    value={formik.values.serverjavaport}
                    fullWidth
                    disabled={!java}
                    onkeypress={handleIpChange}
                    onChange={formik.handleChange}
                    label="port"
                  />
                </Grid>
              </>
            }
            {
              <>
                <Grid item xs={7}>
                  <TextField
                    id="serverbedrockip"
                    fullWidth
                    value={formik.values.serverbedrockip}
                    onChange={formik.handleChange}
                    label="Bedrock server ip"
                    disabled={!bedrock}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    id="serverbedrockport"
                    disabled={!bedrock}
                    onChange={formik.handleChange}
                    label="port"
                  />
                </Grid>
              </>
            }
            <Grid item xs={12}>
              {errors.length > 0 && <p className="error">{errors}</p>}
            </Grid>
            <Grid item xs={12}>
              <CountryAutoSelect />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={4}></Grid>
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

  return (
    <div>
      {
        <>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <NavForm />
              <CssBaseline />
              <Formik
                initialValues={{
                  servername: "",
                  serverjavaip: "",
                  serverjavaport: "25565",
                  serverbedrockip: "",
                  serverbedrockport: "",
                }}
                onSubmit={(values, formik) => {
                  if (
                    values.serverjavaip === "" &&
                    values.serverbedrockip === ""
                  ) {
                    setErrors(
                      "You have to set at least one type of server Ip address."
                    );
                    return;
                  }
                  console.log(JSON.stringify(values));
                  alert("Submitted");
                }}
                validationSchema={ServerFormScheme}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <Details list={serverTypes} formik={formik} />
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </form>
                )}
              </Formik>
            </Container>
          </ThemeProvider>
        </>
      }
    </div>
  );
}
