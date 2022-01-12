/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import TextField from "@mui/material/TextField";
import React from "react";

interface IProps {
  name: string;
  label: string;
  fullWidth: boolean;
  value: string;
  multiline?: boolean;
  maxRows?: number;
}

export default function InputReadText({
  name,
  label,
  fullWidth,
  value,
  multiline,
  maxRows,
}: IProps): JSX.Element {
  return (
    <TextField
      id={name}
      label={label}
      defaultValue={value}
      fullWidth={fullWidth}
      InputProps={{ readOnly: true }}
      multiline={multiline}
      maxRows={maxRows}
    />
  );
}
