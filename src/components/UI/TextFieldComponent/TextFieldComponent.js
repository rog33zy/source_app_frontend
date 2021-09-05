import React from "react";

import { TextField, MenuItem } from "@material-ui/core";

import classes from "./TextFieldComponent.module.css";

const TextFieldComponent = (props) => {
  const [value, setValue] = React.useState(props.defaultValue);

  let selectOptions = [
    {
      value: null,
      label: "",
    },
  ];

  if (props.selectOptions) {
    selectOptions = props.selectOptions;
  }

  const handleChange = (event) => {
    const targetValue = event.target.value;
    props.exportValueFunction(targetValue);
    setValue(targetValue);
  };

  return (
    <TextField
      size="small"
      variant="outlined"
      id={props.value}
      label={props.label}
      className={classes.TextFieldComponent}
      select={props.select}
      value={value}
      onChange={handleChange}
      disabled={props.disabled}
      required={props.required}
      type={props.type}
      style={{
        margin: "10px auto",
        width: "100%",
        textTransform: "capitalize",
      }}
    >
      {selectOptions.map((selectOption) => (
        <MenuItem key={selectOption.value} value={selectOption.value}>
          {selectOption.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default TextFieldComponent;
