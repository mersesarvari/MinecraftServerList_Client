import * as React from "react";
import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Alert,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import NavForm from "../../Components/navigationform";

// icons
//https://www.youtube.com/watch?v=C3hGMDVo_ec

//Components
import {
  ServerFormDetailsScheme,
  ServerFormDescriptionScheme,
  ServerFormSocialScheme,
} from "../../validations/ValidationSchemes";
import { SERVERIP } from "../../LOCAL";

export default function CreateServer() {
  const steps = ["Information", "Description", "Social"];
  const serverTypes = ["java", "bedrock"];
  const [activeStep, setActiveStep] = React.useState(2);
  const [completed, setCompleted] = React.useState({});
  const FD = new FormData();

  //formVariables
  const [thumb, setthumb] = React.useState({});
  const [ico, setico] = React.useState({});
  const [short, setshort] = React.useState({});
  const [long, setlong] = React.useState({});

  /*
  const [details, setDetails] = React.useState({});
  const [descripion, setDescription] = React.useState({});
  const [social, setSocial] = React.useState({});
  */

  const totalSteps = () => {
    return steps.length;
  };
  async function PostData(server) {
    //Here Ill post the data of ther server
    try {
      //console.log("Form Data:", FD);
      //const response = await axios.post(`${SERVERIP}server`, FD);
      //alert(response.data);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      alert(error.request.response);
    }
  }
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const isErrorHappened = () => {};

  const handleNext = () => {
    if (isLastStep()) {
      alert("You reached the last stem on this form");
      //Getting the locale storages
      let details = localStorage.getItem("details");
      let description = localStorage.getItem("description");
      let social = localStorage.getItem("social");
      //console.log(details, description, social);
      //let serverObject = Object.assign(details, description, social);
      //console.log(serverObject);
      //console.log("Icon:", serverObject.icon);
      //PostData();

      console.log(thumb);
      return;
    }
    setActiveStep((nextActiveStep) => nextActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const Details = (props) => {
    return (
      <Formik
        initialValues={{
          name: "",
          javaip: "",
          javaport: "25565",
          bedrockip: "",
          bedrockport: "19132",
        }}
        onSubmit={(values, formik) => {
          if (values.javaip === "" && values.bedrockip === "") {
            return;
          }
          console.log(values);
          alert("Local storage has been created successfully");
          //setDetails(values);
          localStorage.setItem("details", JSON.stringify(values));
          props.FD.append("servername", values.name);
          props.FD.append("javaIp", values.javaip);
          props.FD.append("javaPort", values.javaport);
          props.FD.append("bedrockIp", values.bedrockport);
          props.FD.append("bedrockPort", values.bedrockport);
          props.FD.append("country", values.country);

          handleNext();
        }}
        validationSchema={ServerFormDetailsScheme}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            id="detailsform"
            encType="multipart/form-data"
          >
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
                      id="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    <Grid item xs={12}>
                      {formik.errors.name && (
                        <Alert severity="error">{formik.errors.name}</Alert>
                      )}
                    </Grid>
                  </Grid>
                  <AddressForm formik={formik} />

                  <LocationForm formik={formik} />
                </Grid>
              </Box>
            </Box>
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
              <Button type="submit" sx={{ mr: 1 }}>
                Next
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    );
  };
  const Description = (props) => {
    return (
      <Formik
        initialValues={{
          shortdesc: "",
          longdesc: "",
          thumbnail: "",
          icon: "",
        }}
        onSubmit={(values, formik) => {
          console.log("Icon:", values.icon);
          console.log(values);
          alert("Local storage has been created successfully");
          //setDescription(values);
          //localStorage.setItem("description", JSON.stringify(values));
          let FD = props.FD;
          setshort(values.shortdesc);
          setlong(values.longdesc);
          setthumb(values.thumbnail);
          setico(values.icon);
          console.log("FD values:");
          for (const value of FD.values()) {
            console.log(value);
          }

          console.log(FD);

          handleNext();
        }}
        validationSchema={ServerFormDescriptionScheme}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            id="descriptionform"
            encType="multipart/form-data"
          >
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
                  <Grid item xs={6}>
                    <TextField
                      onBlur={formik.handleBlur}
                      type="file"
                      id="thumbnail"
                      onChange={(file) => {
                        formik.setFieldValue("thumbnail", file.target.files[0]);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    {formik.values.thumbnail &&
                      formik.touched.thumbnail &&
                      !formik.errors.thumbnail && (
                        <PreviewVideo file={formik.values.thumbnail} />
                      )}
                  </Grid>
                  <Grid item xs={12}>
                    {formik.errors.thumbnail && formik.touched.thumbnail && (
                      <Alert severity="error">{formik.errors.thumbnail}</Alert>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      onBlur={formik.handleBlur}
                      type="file"
                      id="icon"
                      hidden
                      onChange={(file) => {
                        formik.setFieldValue("icon", file.target.files[0]);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    {formik.values.icon &&
                      formik.touched.icon &&
                      !formik.errors.icon && (
                        <PreviewImage file={formik.values.icon} />
                      )}
                  </Grid>
                  <Grid item xs={12}>
                    {formik.errors.icon && formik.touched.icon && (
                      <Alert severity="error">{formik.errors.icon}</Alert>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="shortdesc"
                      fullWidth
                      label="Short description"
                      value={formik.values.shortdesc}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {formik.touched.shortdesc && formik.errors.shortdesc && (
                      <Alert severity="error">{formik.errors.shortdesc}</Alert>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="longdesc"
                      multiline
                      minRows={8}
                      fullWidth
                      label="Description"
                      value={formik.values.longdesc}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {formik.touched.longdesc && formik.errors.longdesc && (
                      <Alert severity="error">{formik.errors.longdesc}</Alert>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Box>
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
                <Button type="submit" sx={{ mr: 1 }}>
                  Next
                </Button>
              ) : (
                <Button type="submit" sx={{ mr: 1 }}>
                  Complete
                </Button>
              )}
            </Box>
          </form>
        )}
      </Formik>
    );
  };
  const Social = (props) => {
    return (
      <Formik
        initialValues={{
          youtube: "",
          website: "",
          discord: "",
        }}
        onSubmit={(values, formik) => {
          console.log(values);
          alert("Local storage has been created successfully");
          //setSocial(values);
          localStorage.setItem("social", JSON.stringify(values));
          let FD = props.FD;
          FD.append("website", values.website);
          FD.append("discord", values.discord);
          FD.append("youtube", values.youtube);

          handleNext();
        }}
        validationSchema={ServerFormSocialScheme}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            id="socialform"
            encType="multipart/form-data"
          >
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
                      label="Discord server link"
                      id="discord"
                      onChange={formik.handleChange}
                      value={formik.values.discord}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {formik.errors.discord && formik.touched.discord && (
                      <Alert severity="error">{formik.errors.discord}</Alert>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Website url"
                      id="website"
                      onChange={formik.handleChange}
                      value={formik.values.website}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {formik.errors.website && formik.touched.website && (
                      <Alert severity="error">{formik.errors.website}</Alert>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Youtube url"
                      id="youtube"
                      onChange={formik.handleChange}
                      value={formik.values.youtube}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {formik.errors.youtube && formik.touched.youtube && (
                      <Alert severity="error">{formik.errors.youtube}</Alert>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Box>
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
                <Button type="submit" sx={{ mr: 1 }}>
                  Next
                </Button>
              ) : (
                <Button type="submit" sx={{ mr: 1 }}>
                  Complete
                </Button>
              )}
            </Box>
          </form>
        )}
      </Formik>
    );
  };
  const AddressForm = (props) => {
    const [javacheck, setJavacheck] = useState(false);
    const [bedrockcheck, setBedrockcheck] = useState(false);
    let formik = props.formik;
    return (
      <Grid item xs={12} container spacing={2}>
        <Grid item xd={6}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => {
                  setJavacheck(!javacheck);
                }}
              />
            }
            label="java server"
          />
        </Grid>
        <Grid item xd={6}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => {
                  setBedrockcheck(!bedrockcheck);
                }}
              />
            }
            label="bedrock server"
          />
        </Grid>

        <Grid item xs={7}>
          <TextField
            fullWidth
            id="javaip"
            label="Java server ip"
            value={formik.values.javaip}
            onChange={formik.handleChange}
            disabled={!javacheck}
            required
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="javaport"
            value={formik.values.javaport}
            fullWidth
            disabled={!javacheck}
            onChange={formik.handleChange}
            label="port"
            required
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="bedrockip"
            fullWidth
            value={formik.values.bedrockip}
            onChange={formik.handleChange}
            label="Bedrock server ip"
            disabled={!bedrockcheck}
            required
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="bedrockport"
            value={formik.values.serverbedrockport}
            disabled={!bedrockcheck}
            onChange={formik.handleChange}
            required
            label="port"
          />
        </Grid>
        <Grid item xs={12}>
          {(formik.touched.javaip || formik.touched.bedrockip) &&
            formik.values.javaip === "" &&
            formik.values.bedrockip === "" && (
              <Alert severity="error">
                You cannot create a server without setting the ip address
              </Alert>
            )}
        </Grid>
      </Grid>
    );
  };
  const LocationForm = (props) => {
    const countries = [
      "Afghanistan",
      "Aland Islands",
      "Albania",
      "Algeria",
      "American Samoa",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antarctica",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia",
      "Bonaire, Sint Eustatius and Saba",
      "Bosnia and Herzegovina",
      "Botswana",
      "Bouvet Island",
      "Brazil",
      "British Indian Ocean Territory",
      "Brunei Darussalam",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cape Verde",
      "Cayman Islands",
      "Central African Republic",
      "Chad",
      "Chile",
      "China",
      "Christmas Island",
      "Cocos (Keeling) Islands",
      "Colombia",
      "Comoros",
      "Congo",
      "Congo, Democratic Republic of the Congo",
      "Cook Islands",
      "Costa Rica",
      "Cote D'Ivoire",
      "Croatia",
      "Cuba",
      "Curacao",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Ethiopia",
      "Falkland Islands (Malvinas)",
      "Faroe Islands",
      "Fiji",
      "Finland",
      "France",
      "French Guiana",
      "French Polynesia",
      "French Southern Territories",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Guernsey",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Heard Island and McDonald Islands",
      "Holy See (Vatican City State)",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran, Islamic Republic of",
      "Iraq",
      "Ireland",
      "Isle of Man",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jersey",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea, Democratic People's Republic of",
      "Korea, Republic of",
      "Kosovo",
      "Kuwait",
      "Kyrgyzstan",
      "Lao People's Democratic Republic",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libyan Arab Jamahiriya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macao",
      "Macedonia, the Former Yugoslav Republic of",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Martinique",
      "Mauritania",
      "Mauritius",
      "Mayotte",
      "Mexico",
      "Micronesia, Federated States of",
      "Moldova, Republic of",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "Netherlands Antilles",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Niue",
      "Norfolk Island",
      "Northern Mariana Islands",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestinian Territory, Occupied",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Pitcairn",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Reunion",
      "Romania",
      "Russian Federation",
      "Rwanda",
      "Saint Barthelemy",
      "Saint Helena",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Martin",
      "Saint Pierre and Miquelon",
      "Saint Vincent and the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Serbia and Montenegro",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "St Martin",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Georgia and the South Sandwich Islands",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Svalbard and Jan Mayen",
      "Swaziland",
      "Sweden",
      "Switzerland",
      "Syrian Arab Republic",
      "Taiwan, Province of China",
      "Tajikistan",
      "Tanzania, United Republic of",
      "Thailand",
      "Timor-Leste",
      "Togo",
      "Tokelau",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks and Caicos Islands",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "United States Minor Outlying Islands",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Venezuela",
      "Viet Nam",
      "Virgin Islands, British",
      "Virgin Islands, U.s.",
      "Wallis and Futuna",
      "Western Sahara",
      "Yemen",
      "Zambia",
      "Zimbabwe",
    ];
    const [country, setCountry] = useState("United States");
    const handleChange = (event) => {
      setCountry(event.target.value);
    };
    return (
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-autowidth-label">
            Select country
          </InputLabel>
          <Select
            value={country}
            onChange={handleChange}
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            fullWidth
            label="Server country"
          >
            {countries.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  };
  const PreviewImage = ({ file }) => {
    const [preview, setPreview] = useState({});
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
    return (
      <div>
        <img
          style={{ width: "60px", height: "60px" }}
          alt=""
          src={preview}
        ></img>
      </div>
    );
  };
  const PreviewVideo = ({ file }) => {
    const [preview, setPreview] = useState({});
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
    return (
      <div>
        <video
          style={{ height: "60px" }}
          autoPlay
          playsInline
          loop
          muted
          alt="All the devices"
          src={preview}
        />
      </div>
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
              <StepButton color="inherit">{label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === 0 && <Details list={serverTypes} FD={FD} />}
          {activeStep === 1 && <Description list={serverTypes} FD={FD} />}
          {activeStep === 2 && <Social list={serverTypes} FD={FD} />}
        </React.Fragment>
      </Box>
    </Container>
  );
}
