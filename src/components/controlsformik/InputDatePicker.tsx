/* eslint-disable react/jsx-props-no-spreading */
import TextField from "@mui/material/TextField";
import { useField } from "formik";
import * as React from "react";

interface IProps {
  label: string;
  name: string;
}
interface IError {
  error?: boolean;
  helperText?: string;
}

export default function InputDatePicker({
  label,
  ...otherprops
}: IProps): JSX.Element {
  const [field, mata] = useField(otherprops.name);

  const configError: IError = {};

  if (mata && mata.touched && mata.error) {
    configError.error = true;
    configError.helperText = mata.error;
  }

  const configTextField = {
    ...field,
    ...otherprops,
    ...configError,
  };

  return (
    <TextField
      label={label}
      type="date"
      sx={{ width: 180 }}
      InputLabelProps={{
        shrink: true,
      }}
      {...configTextField}
    />
  );
}
