/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useField, useFormikContext } from "formik";
import * as React from "react";

import { ISelectData } from "../../pages/RequestStepForm/components/Interface";
import InputText from "./InputText";

interface IProps {
  label: string;
  name: string;
  labelWithId: boolean;
  getOptions?: (id?: string) => Promise<ISelectData[]>;
  optionsPrimaryKey?: string | undefined;
  onChangeCleanFieldName?: string | undefined;
  editMode: boolean;
  defaultOptions?: ISelectData[];
}

interface IError {
  error?: boolean;
  helperText?: string;
}

export default function InputSelect(props: IProps): JSX.Element {
  const {
    label,
    name,
    labelWithId,
    optionsPrimaryKey,
    onChangeCleanFieldName,
    editMode,
    defaultOptions,
    getOptions,
  } = props;

  const [field, mata] = useField(name);
  const { setFieldValue, setTouched } = useFormikContext();

  const getInputValue = (): string => {
    if (field.value) {
      return labelWithId
        ? `${field.value.id}-${field.value.description}`
        : field.value.id;
    }
    return "";
  };

  const [inputValue, setInputValue] = React.useState(getInputValue());

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly ISelectData[]>([]);
  const loading = open && options.length === 0;

  const configTextField: IError = {};

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        if (defaultOptions) {
          setOptions([...defaultOptions]);
        } else if (getOptions) {
          const data = await getOptions(optionsPrimaryKey);
          setOptions([...data]);
          if (data.length === 1) setFieldValue(name, data[0]);
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
    <>
      {!editMode && (
        <InputText
          name={name}
          label={label}
          fullWidth
          labelWithId={labelWithId}
          inputProps={{
            readOnly: true,
          }}
        />
      )}
      {editMode && (
        <Autocomplete
          id={name}
          autoComplete
          {...field}
          inputValue={inputValue}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onBlur={() => setTouched({ [name]: true })}
          isOptionEqualToValue={(option, value) => {
            return (
              option.id === value.id ||
              option.description.toUpperCase() ===
                value.description.toUpperCase()
            );
          }}
          getOptionLabel={(option) => {
            if (option.description === "") return "";

            return labelWithId
              ? `${option.id}-${option.description}`
              : option.description;
          }}
          options={options}
          loading={loading}
          onChange={(event, value) => {
            setFieldValue(name, value);

            if (onChangeCleanFieldName) {
              console.log(`cleaning ${onChangeCleanFieldName}`);
              setFieldValue(onChangeCleanFieldName, {
                id: "",
                description: "",
              });
            }
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              {...configTextField}
            />
          )}
        />
      )}
    </>
  );
}
