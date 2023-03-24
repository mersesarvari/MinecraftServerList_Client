import { TextField } from "@mui/material";
import { FieldConfig, useField } from "formik";

const InputField = (props) => {
  const [field, meta] = useField("props");
  return (
    <TextField
      fullWidth={props.fullwidth}
      label={props.label}
      {...field}
      {...props}
    />
  );
};

export default InputField;
