import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const RegistrationScheme = yup.object().shape({
  email: yup
    .string()
    .email("Your email address is not valid")
    .required("Email address is required"),
  password: yup
    .string()
    .min(6, "Password have to be at least 6 characters")
    .max(20, "Password cannot be longer than 20 characters")
    .matches(passwordRules, {
      message: "Password must contain an Uppercase character and a number",
    })
    .required("Password is required"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const LoginScheme = yup.object().shape({
  email: yup
    .string()
    .email("Your email address is not valid")
    .required("Email address is required"),
  password: yup
    .string()
    .min(6, "Password have to be at least 6 characters")
    .max(20, "Password cannot be longer than 20 characters")
    .matches(passwordRules, {
      message: "Password must contain an Uppercase character and a number",
    })
    .required("Password is required"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const ServerFormScheme = yup.object().shape({
  servername: yup
    .string()
    .required("Server name is required")
    .min(5, "Minimum server name length must be 5 character")
    .max(20, "Minimum server name length must be 20 character"),
  servertypes: yup.string(),
  serverjavaip: yup.string(),
  serverjavaport: yup.string().required(),
  serverbedrockip: yup.string(),
  serverbedrockport: yup.string().required(),
  servercountry: yup.string().required(),
  serverthumbnail: yup.string().required(),
  servericon: yup.string().required(),
  servershortdescription: yup.string().required().min(5).max(50),
  serverlongdescription: yup.string().required().min(50).max(5000),
  serverdiscordlink: yup.string(),
  serveryoutubelink: yup.string(),
  serverwebsitelink: yup.string(),
});

export const CreateServerScheme = yup.object().shape({
  name: yup.string().required("Server name is required"),
  ipaddress: yup
    .string()
    .min(6, "Password have to be at least 6 characters")
    .max(20, "Password cannot be longer than 20 characters"),
  serverlogo: yup
    .array()
    .nullable()
    .required("VALIDATION_FIELD_REQUIRED")
    .test("is-correct-file", "VALIDATION_FIELD_FILE_BIG", checkIfFilesAreTooBig)
    .test(
      "is-big-file",
      "VALIDATION_FIELD_FILE_WRONG_TYPE",
      checkIfFilesAreCorrectType
    ),
});

export function checkIfFilesAreTooBig(file) {
  let valid = true;
  const size = file.size / 1024 / 1024;
  if (size > 10) {
    valid = false;
  }
  return valid;
}

export function checkIfFilesAreCorrectType(file) {
  let valid = true;
  if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
    valid = false;
  }
  return valid;
}
