import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
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

// icons
//https://www.youtube.com/watch?v=C3hGMDVo_ec

import {
  ServerFormDetailsScheme,
  ServerFormDescriptionScheme,
  ServerFormSocialScheme,
} from "../../validations/ValidationSchemes";
import { SERVERIP } from "../../LOCAL";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRef } from "react";

export default function CreateServer() {
  const steps = ["Information", "Description", "Social"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  //formVariables
  const [thumb, setthumb] = React.useState({});
  const [ico, setico] = React.useState({});
  const [short, setshort] = React.useState({});
  const [long, setlong] = React.useState({});

  //formVariables
  const [n, setn] = React.useState({});
  const [jip, setjip] = React.useState({});
  const [jp, setjp] = React.useState({});
  const [bip, setbip] = React.useState({});
  const [bp, setbp] = React.useState({});
  const [c, setC] = React.useState({});
  var country = useRef("United States");
  useEffect(() => {
    // 👇️ only runs once
    country.current = "United States";
  }, []); // 👈️ empty dependencies array

  //formVariables
  const [y, sety] = React.useState({});
  const [d, setd] = React.useState({});
  const [w, setw] = React.useState({});
  const navigate = useNavigate();
  var formData = new FormData();

  const totalSteps = () => {
    return steps.length;
  };
  async function PostData() {
    formData.append("publisherid", Cookies.get("userid"));
    formData.append("servername", n);
    formData.append("javaIp", jip);
    formData.append("javaPort", jp);
    formData.append("bedrockIp", bip);
    formData.append("bedrockPort", bp);
    formData.append("country", country);
    formData.append("thumbnail", thumb);
    formData.append("logo", ico);
    formData.append("shortDescription", short);
    formData.append("longDescription", long);
    formData.append("youtube", y);
    formData.append("discord", d);
    formData.append("website", w);

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    try {
      const response = await axios.post(`${SERVERIP}server`, formData);
      console.log(response);
      alert(response.data);
    } catch (error) {
      alert(error.request.response);
    }
  }
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const handleNext = () => {
    if (!isLastStep()) {
      setActiveStep((nextActiveStep) => nextActiveStep + 1);
      return;
    }
    PostData();
    navigate("/");
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
    const [showMissingIpError, setSHowMissingIpError] = useState("");
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(ServerFormDetailsScheme),
      defaultValues: {
        javaport: "25565",
        bedrockport: "19132",
        country: "United States",
      },
    });
    const onSubmit = (data) => {
      console.log(data.javaip);
      if (
        (data.javaip === "" || data.javaip === undefined) &&
        (data.bedrockip === "" || data.bedrockip === undefined)
      ) {
        setSHowMissingIpError(
          "You have to set the ip address(s) of your server"
        );
        return;
      }
      console.log("Submitting");
      data.country = country.current;
      console.log(data);
      setn(data.name);
      setjip(data.javaip);
      setjp(data.javaport);
      setbip(data.bedrockip);
      setbp(data.bedrockport);
      setC(data.country);
      handleNext();
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
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
                  {...register("name")}
                />
                {errors.name && (
                  <Alert severity="error">{errors.name?.message}</Alert>
                )}
              </Grid>
              <AddressForm register={register} />
              <Grid item xs={12}>
                {showMissingIpError !== "" && (
                  <Alert severity="error">{showMissingIpError}</Alert>
                )}
              </Grid>
              <LocationForm register={register} />
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
    );
  };
  const Description = (props) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(ServerFormDescriptionScheme),
    });
    const onSubmit = (data) => {
      console.log("Submitting");
      console.log(data);

      setico(data.icon[0]);
      setthumb(data.thumbnail[0]);
      setshort(data.shortdesc);
      setlong(data.longdesc);
      handleNext();
    };
    return (
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
                  {...register("thumbnail")}
                  type="file"
                  id="thumbnail"
                  hidden
                />
                {errors.thumbnail && (
                  <Alert severity="error">{errors.thumbnail?.message}</Alert>
                )}
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <TextField {...register("icon")} type="file" id="icon" hidden />
                {errors.icon && (
                  <Alert severity="error">{errors.icon?.message}</Alert>
                )}
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={12}>
                <TextField
                  id="shortdesc"
                  fullWidth
                  label="Short description"
                  {...register("shortdesc")}
                />
                {errors.shortdesc && (
                  <Alert severity="error">{errors.shortdesc?.message}</Alert>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="longdesc"
                  multiline
                  minRows={8}
                  fullWidth
                  label="Description"
                  {...register("longdesc")}
                />
                {errors.longdesc && (
                  <Alert severity="error">{errors.longdesc?.message}</Alert>
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
    );
  };
  const Social = (props) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(ServerFormSocialScheme),
    });
    const SaveData = (data) => {
      console.log("Submitting");
      console.log(data);

      sety(data.youtube);
      setd(data.discord);
      setw(data.website);
      handleNext();
    };
    return (
      <form
        onSubmit={handleSubmit(SaveData)}
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
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Discord server link"
                  id="discord"
                  {...register("discord")}
                />
                {errors.discord && (
                  <Alert severity="error">{errors.discord?.message}</Alert>
                )}
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Website url"
                  id="website"
                  {...register("website")}
                />
                {errors.website && (
                  <Alert severity="error">{errors.website?.message}</Alert>
                )}
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Youtube url"
                  id="youtube"
                  {...register("youtube")}
                />
                {errors.youtube && (
                  <Alert severity="error">{errors.youtube?.message}</Alert>
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
    );
  };
  const AddressForm = (props) => {
    const [javacheck, setJavacheck] = useState(false);
    const [bedrockcheck, setBedrockcheck] = useState(false);
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
            disabled={!javacheck}
            required
            {...props.register("javaip")}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="javaport"
            fullWidth
            disabled={!javacheck}
            label="port"
            required
            {...props.register("javaport")}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="bedrockip"
            fullWidth
            label="Bedrock server ip"
            disabled={!bedrockcheck}
            required
            {...props.register("bedrockip")}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="bedrockport"
            disabled={!bedrockcheck}
            required
            label="port"
            {...props.register("bedrockport")}
          />
        </Grid>
      </Grid>
    );
  };
  const LocationForm = (props) => {
    const [cntry, setCntry] = useState(country.current);
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
    const handleChange = (event) => {
      country.current = event.target.value;
      setCntry(country.current);
      console.log(country.current);
    };
    return (
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-autowidth-label">
            Select country
          </InputLabel>
          <Select
            value={cntry}
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
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit">{label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>{activeStep === 0 && <Details />}</React.Fragment>
        <React.Fragment>{activeStep === 1 && <Description />}</React.Fragment>
        <React.Fragment>{activeStep === 2 && <Social />}</React.Fragment>
      </Box>
    </Container>
  );
}
