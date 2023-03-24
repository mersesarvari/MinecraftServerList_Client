import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import NavForm from "../../Components/navigationform";

// icons
//https://www.youtube.com/watch?v=C3hGMDVo_ec

//Components
import CountryAutoSelect from "../../Components/CountryAutoSelect";
import { ServerFormDetailsScheme } from "../../validations/ValidationSchemes";

export default function CreateServer() {
  const steps = ["Information", "Description", "Social"];
  const serverTypes = ["java", "bedrock"];
  const [javacheck, setJavacheck] = useState(false);
  const [bedrockcheck, setBedrockcheck] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [showError, setShowError] = useState([false, true, true]);

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const isErrorHappened = () => {};

  const handleNext = () => {
    if (showError[activeStep]) {
      alert("YOu cannot move from this step. Correct the errors");
      return;
    }
    if (isLastStep()) {
      alert("You reached the last stem on this form");
      return;
    }
    setActiveStep((nextActiveStep) => nextActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    if (showError[activeStep] && activeStep < step) {
      alert("YOu cannot move from this step. Correct the errors");
      return;
    }
    setActiveStep(step);
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

  const Details = () => {
    return (
      <Formik
        initialValues={{
          servername: "",
          serverjavaip: "",
          serverjavaport: "25565",
          serverbedrockip: "",
          serverbedrockport: "19132",
        }}
        onSubmit={(values, formik) => {
          if (values.serverjavaip === "" && values.serverbedrockip === "") {
            return;
          }

          console.log(JSON.stringify(values));
          alert("Next page");
        }}
        validationSchema={ServerFormDetailsScheme}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",

                alignItems: "center",
              }}
            >
              <Box>
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
                        (formik.touched.servername &&
                          Boolean(formik.errors.servername)) ||
                        showError[0]
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
                        <Checkbox
                          checked={bedrockcheck}
                          onChange={SetBedrockCheck}
                        />
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
                          required
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          id="serverbedrockport"
                          value={formik.values.serverbedrockport}
                          disabled={!bedrockcheck}
                          onChange={formik.handleChange}
                          required
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
          </form>
        )}
      </Formik>
    );
  };
  const Description = () => {
    return (
      <Formik
        initialValues={{
          servername: "",
          serverjavaip: "",
          serverjavaport: "25565",
          serverbedrockip: "",
          serverbedrockport: "19132",
        }}
        onSubmit={(values, formik) => {
          if (values.serverjavaip === "" && values.serverbedrockip === "") {
            return;
          }

          console.log(JSON.stringify(values));
          alert("Next page");
        }}
        validationSchema={ServerFormDetailsScheme}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
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
                  <Grid item xs={6}>
                    <input hidden accept="image/*" type="file" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField type="file" />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField fullWidth label="Short description" />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      multiline
                      minRows={8}
                      fullWidth
                      label="Description"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    );
  };
  const Social = () => {
    return (
      <Formik
        initialValues={{
          servername: "",
          serverjavaip: "",
          serverjavaport: "25565",
          serverbedrockip: "",
          serverbedrockport: "19132",
        }}
        onSubmit={(values, formik) => {
          if (values.serverjavaip === "" && values.serverbedrockip === "") {
            return;
          }

          console.log(JSON.stringify(values));
          alert("Next page");
        }}
        validationSchema={ServerFormDetailsScheme}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
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
                    <TextField fullWidth label="Discord link" id="fullWidth" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Youtube intro link"
                      id="fullWidth"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Website" id="fullWidth" />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    );
  };

  return (
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
        <React.Fragment>
          {activeStep === 0 && <Details list={serverTypes} />}
          {activeStep === 1 && <Description list={serverTypes} />}
          {activeStep === 2 && <Social list={serverTypes} />}
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
            {isLastStep ? (
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
            ) : (
              <Button type="submit" onClick={handleNext} sx={{ mr: 1 }}>
                Complete
              </Button>
            )}
          </Box>
        </React.Fragment>
      </Box>
    </Container>
  );
}
