/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { InputProps } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { useField } from "formik";
import React from "react";

interface IProps {
  name: string;
  label: string;
  fullWidth: boolean;
  inputProps: InputProps;
  error?: boolean;
  helperText?: string;
  labelWithId?: boolean;
  multiline?: boolean;
  maxRows?: number;
}

export default function InputText({
  labelWithId,
  inputProps,
  name,
  ...otherProps
}: IProps): JSX.Element {
  const [field, mata] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
  };

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }
  if (field.value) {
    if (typeof field.value === "object") {
      configTextField.value = labelWithId
        ? `${field.value.id}-${field.value.description}`
        : field.value.description;
    }
  }
  return (
    <TextField
      id={name}
      defaultValue={configTextField.value}
      InputProps={inputProps}
      {...configTextField}
    />
  );
}
