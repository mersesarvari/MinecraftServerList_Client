import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

const SelectMultipleItem = (props) => {
  const fixedOptions = [];
  const [value, setValue] = useState([]);
  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      onChange={(event, newValue) => {
        setValue([
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
        ]);
      }}
      options={props.list}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Server type(s)"
          placeholder="select server types"
        />
      )}
    />
  );
};

export default SelectMultipleItem;
