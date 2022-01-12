/* eslint-disable react/jsx-props-no-spreading */
import AccountCircle from "@mui/icons-material/AccountCircle";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useField, useFormikContext } from "formik";
// eslint-disable-next-line import/no-extraneous-dependencies
import throttle from "lodash/throttle";
import * as React from "react";

import { IEmployeeData } from "../../pages/RequestStepForm/components/Interface";

interface IError {
  error?: boolean;
  helperText?: string;
}

interface IProps {
  name: string;
  label: string;
  labelWithId: boolean;
  // eslint-disable-next-line react/require-default-props
  helperText?: string;
  getOptions: (param: string) => Promise<IEmployeeData[]>;
  setLabelOption: (option: IEmployeeData) => string;
  setLabelHintOptions: (option: IEmployeeData) => string;
}

export default function InputEmployee(props: IProps): JSX.Element {
  const {
    label,
    name,
    helperText,
    getOptions,
    setLabelOption,
    setLabelHintOptions,
  } = props;

  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [inputValue, setInputValue] = React.useState(
    setLabelOption(field.value)
  );
  const [options, setOptions] = React.useState<readonly IEmployeeData[]>([]);

  const configTextField: IError = {};

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }

  const getResults = React.useMemo(
    () =>
      throttle(
        async (
          request: { input: string },
          callback: (results?: readonly IEmployeeData[]) => void
        ) => {
          const data = await getOptions(request.input);
          callback(data);
        },
        200
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === "") {
      return undefined;
    }

    getResults({ input: inputValue }, (results?: readonly IEmployeeData[]) => {
      if (active) {
        let newOptions: readonly IEmployeeData[] = [];

        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [field.value, inputValue, getResults]);

  return (
    <Autocomplete
      id={name}
      getOptionLabel={(option) => setLabelOption(option)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      filterSelectedOptions
      {...field}
      inputValue={inputValue}
      onChange={(
        event: React.SyntheticEvent,
        newValue: IEmployeeData | null
      ) => {
        setFieldValue(name, newValue);
        setFieldValue("request.updateEmployee", true);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          helperText={helperText}
          {...configTextField}
        />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={AccountCircle}
                  sx={{ color: "text.secondary", mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="body2" color="text.secondary">
                  {setLabelHintOptions(option)}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
