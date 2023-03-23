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
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import NavForm from "../../Components/navigationform";

// icons
//https://www.youtube.com/watch?v=C3hGMDVo_ec

//Components
import CountryAutoSelect from "../../Components/CountryAutoSelect";
import { ServerFormScheme } from "../../validations/ValidationSchemes";

const theme = createTheme();

export default function CreateServer() {
  const steps = ["Information", "Description", "Social"];
  const FormTitle = ["Details", "Description", "Social"];
  const [page, setPage] = useState(0);
  const serverTypes = ["java", "bedrock"];
  const [javacheck, setJavacheck] = useState(false);
  const [bedrockcheck, setBedrockcheck] = useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  function SetJavaCheck(event) {
    event.preventDefault();
    setJavacheck(event.target.checked);
  }
  function SetBedrockCheck(event) {
    event.preventDefault();
    setBedrockcheck(event.target.checked);
  }

  const Details = ({ list, formik }) => {
    const [nextavailable, setNextAvailable] = useState(false);
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
                  <Checkbox checked={javacheck} onChange={SetJavaCheck} />
                }
                label="java server"
              />
            </Grid>
            <Grid item xd={6}>
              <FormControlLabel
                control={
                  <Checkbox checked={bedrockcheck} onChange={SetBedrockCheck} />
                }
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
                    disabled={!javacheck}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    id="serverjavaport"
                    value={formik.values.serverjavaport}
                    fullWidth
                    disabled={!javacheck}
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
                    disabled={!bedrockcheck}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    id="serverbedrockport"
                    disabled={!bedrockcheck}
                    onChange={formik.handleChange}
                    label="port"
                  />
                </Grid>
              </>
            }
            <Grid item xs={12}>
              {(formik.touched.serverjavaip ||
                formik.touched.serverbedrockip) &&
                formik.values.serverjavaip === "" &&
                formik.values.serverbedrockip === "" && (
                  <p className="error">
                    {"You have to set at least 1 ipaddress"}
                  </p>
                )}
            </Grid>
            <Grid item xs={12}>
              <CountryAutoSelect />
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };
  const Description = ({ formik }) => {
    return (
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
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
          </Grid>
        </Box>
      </Box>
    );
  };

  return (
    /*
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
                    return;
                  }

                  console.log(JSON.stringify(values));
                  alert("Next page");
                  Next();
                }}
                validationSchema={ServerFormScheme}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    {page === 0 && (
                      <Details list={serverTypes} formik={formik} />
                    )}
                    {page === 1 && (
                      <Description list={serverTypes} formik={formik} />
                    )}
                    {page === 2 && (
                      <Social list={serverTypes} formik={formik} />
                    )}
                  </form>
                )}
              </Formik>
            </Container>
          </ThemeProvider>
        </>
        */
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <NavForm />
        <CssBaseline />
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
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
                        return;
                      }

                      console.log(JSON.stringify(values));
                      alert("Next page");
                    }}
                    validationSchema={ServerFormScheme}
                  >
                    {(formik) => (
                      <form onSubmit={formik.handleSubmit}>
                        {activeStep === 0 && (
                          <Details list={serverTypes} formik={formik} />
                        )}
                        {activeStep === 1 && (
                          <Description list={serverTypes} formik={formik} />
                        )}
                        {activeStep === 2 && (
                          <Social list={serverTypes} formik={formik} />
                        )}
                      </form>
                    )}
                  </Formik>
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                  </Button>
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography
                        variant="caption"
                        sx={{ display: "inline-block" }}
                      >
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1
                          ? "Finish"
                          : "Complete Step"}
                      </Button>
                    ))}
                </Box>
              </React.Fragment>
            )}
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
