import * as yup from "yup";


const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const RegistrationScheme = yup.object().shape({
    email: yup.string()
    .email("Your email address is not valid")
    .required("Email address is required"),
    password: yup.string()
    .min(6, "Password have to be at least 6 characters")
    .max(20, "Password cannot be longer than 20 characters")
    .matches(passwordRules, { message: "Password must contain an Uppercase character and a number" }).required("Password is required"),
    confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

export const LoginScheme = yup.object().shape({
    email: yup.string()
    .email("Your email address is not valid")
    .required("Email address is required"),
    password: yup.string()
    .min(6, "Password have to be at least 6 characters")
    .max(20, "Password cannot be longer than 20 characters")
    .matches(passwordRules, { message: "Password must contain an Uppercase character and a number" }).required("Password is required"),
    confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});