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

export const ServerFormDetailsScheme = yup.object().shape({
  name: yup
    .string()
    .min(5, "Minimum server name length must be 5 character")
    .max(20, "Minimum server name length must be 20 character")
    .required("Server name is required"),
  javaip: yup.string().max(30),
  javaport: yup.string().max(30),
  bedrockip: yup.string().max(30),
  bedrockport: yup.string().max(30),
});

export const ServerFormDescriptionScheme = yup.object().shape({
  shortdesc: yup.string().min(10).max(30).required(),
  longdesc: yup.string().min(50).max(5000).required(),
  thumbnail: yup
    .mixed()
    .required()
    .test("FILE_SIZE", "To big!", (value) => value && value.size < 1024 * 300)
    .test(
      "FILE_TYPE",
      "Invalid file type",
      (value) => value && ["video/mp4", "video/ogg"].includes(value.type)
    ),
  icon: yup
    .mixed()
    .required()
    .test("FILE_SIZE", "To big!", (value) => value && value.size < 1024 * 100)
    .test(
      "FILE_TYPE",
      "Invalid file type",
      (value) =>
        value && ["image/jpg", "image/png", "image/gif"].includes(value.type)
    ),
});
export const ServerFormSocialScheme = yup.object().shape({
  youtube: yup
    .string()
    .matches(
      /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]{1,63}(\.[a-zA-Z]{1,63}){1,5}(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
      "Enter correct url!"
    )
    .required("Please enter website"),
  discord: yup
    .string()
    .matches(
      /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]{1,63}(\.[a-zA-Z]{1,63}){1,5}(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
      "Enter correct url!"
    )
    .required("Please enter website"),
  website: yup
    .string()
    .matches(
      /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]{1,63}(\.[a-zA-Z]{1,63}){1,5}(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
      "Enter correct url!"
    )
    .required("Please enter website"),
});
