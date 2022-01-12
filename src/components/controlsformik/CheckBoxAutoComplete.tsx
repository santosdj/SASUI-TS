/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useField, useFormikContext } from "formik";
import * as React from "react";

import { IAS400RoutineData } from "../../pages/RequestStepForm/components/Interface";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
interface IError {
  error?: boolean;
  helperText?: string;
}

interface IProps {
  name: string;
  label: string;
  labelWithId: boolean;
  helperText: string;
  getOptions: (param: string) => Promise<IAS400RoutineData[]>;
  parentValue?: string | undefined;
}

export default function CheckAutoComplete(props: IProps): JSX.Element {
  const { name, labelWithId, getOptions, parentValue } = props;

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly IAS400RoutineData[]>(
    []
  );

  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [inputValue, setInputValue] = React.useState("");

  const configTextField: IError = {};

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }

  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        if (parentValue === "") {
          setOptions([]);
          setOpen(false);
        } else if (getOptions) {
          const data = await getOptions(parentValue || "");
          setOptions([...data]);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      fullWidth
      multiple
      id={name}
      onOpen={() => {
        setOpen(true);
      }}
      {...field}
      onClose={() => {
        setOpen(false);
      }}
      inputValue={inputValue}
      onInputChange={(event: any, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event: any, values: IAS400RoutineData[]) => {
        setFieldValue(name, [...values]);
      }}
      options={options}
      isOptionEqualToValue={(option, value) => {
        if (labelWithId) {
          return (
            option.id === value.id ||
            option.description.toUpperCase() === value.description.toUpperCase()
          );
        }
        return (
          option.description.toUpperCase() === value.description.toUpperCase()
        );
      }}
      disableCloseOnSelect
      getOptionLabel={(option) => {
        if (option.description === "") return "";

        return labelWithId
          ? `${option.id}-${option.description}`
          : option.description;
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {labelWithId
            ? `${option.id}-${option.description}`
            : option.description}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Rotinas"
          placeholder="Rotinas"
          {...configTextField}
        />
      )}
    />
  );
}
