import { IconPropsColorOverrides } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import { useField, useFormikContext } from "formik";
import * as React from "react";

interface IError {
  error?: boolean;
  helperText?: string;
}
interface IProps {
  name: string;
}

export default function CheckBoxAS400Access({ name }: IProps): JSX.Element {
  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();

  const { inc, exc, alt, con } = field.value;

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = evt.target;

    const access = {
      ...field.value,
      [evt.target.name]: checked,
    };
    if (!access.inc && !access.exc && !access.alt) access.con = true;
    setFieldValue(name, access);
  };

  return (
    // MuiFormControlLabel-root
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="I"
          control={
            <Checkbox
              size="small"
              checked={inc}
              onChange={handleChange}
              name="inc"
            />
          }
          label="Inc"
          labelPlacement="top"
          sx={{
            marginLeft: "4px",
            marginRight: "4px",
          }}
        />
        <FormControlLabel
          value="E"
          control={
            <Checkbox
              size="small"
              checked={exc}
              onChange={handleChange}
              name="exc"
            />
          }
          label="Exc"
          labelPlacement="top"
          sx={{
            marginLeft: "4px",
            marginRight: "4px",
          }}
        />
        <FormControlLabel
          value="A"
          control={
            <Checkbox
              size="small"
              checked={alt}
              onChange={handleChange}
              name="alt"
            />
          }
          label="Alt"
          labelPlacement="top"
          sx={{
            marginLeft: "4px",
            marginRight: "4px",
          }}
        />
        <FormControlLabel
          value="C"
          control={
            <Checkbox
              size="small"
              checked={con}
              onChange={handleChange}
              name="con"
            />
          }
          label="Con"
          labelPlacement="top"
          sx={{
            marginLeft: "4px",
            marginRight: "4px",
          }}
        />
      </FormGroup>
    </FormControl>
  );
}
