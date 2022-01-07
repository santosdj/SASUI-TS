/* eslint-disable react/jsx-props-no-spreading */
import AccountCircle from "@mui/icons-material/AccountCircle";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { id } from "date-fns/locale";
import { useField, useFormikContext } from "formik";
// eslint-disable-next-line import/no-extraneous-dependencies
import throttle from "lodash/throttle";
import * as React from "react";

import { ISelectData } from "../../pages/RequestStepForm/components/Interface";

interface IProps {
  name: string;
  label: string;
  labelWithId: boolean;
  helperText: string;
  getOptions: (param: string) => Promise<ISelectData[]>;
  // eslint-disable-next-line react/require-default-props
  disabledOptions?: ISelectData[];
}
interface IError {
  error?: boolean;
  helperText?: string;
}

export default function InputAutoComplete(props: IProps): JSX.Element {
  const { name, label, labelWithId, helperText, getOptions, disabledOptions } =
    props;

  const [options, setOptions] = React.useState<readonly ISelectData[]>([]);

  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [inputValue, setInputValue] = React.useState("");

  const configTextField: IError = {};

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }

  const setLabelOption = (option: ISelectData) => {
    if (labelWithId)
      return option.id !== "" ? `${option.id} - ${option.description}` : "";
    return option.id;
  };

  const getResults = React.useMemo(
    () =>
      throttle(
        async (
          request: { input: string },
          callback: (results?: readonly ISelectData[]) => void
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

    if (inputValue === "" || inputValue === " - ") {
      setOptions(field.value ? [field.value] : []);
      return undefined;
    }

    getResults({ input: inputValue }, (results?: readonly ISelectData[]) => {
      if (active) {
        let newOptions: readonly ISelectData[] = [];

        if (field.value) {
          newOptions = [field.value];
        }

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
      {...field}
      inputValue={inputValue}
      getOptionLabel={setLabelOption}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      filterSelectedOptions
      getOptionDisabled={(option) => {
        const result = disabledOptions?.find((value) => value.id === option.id);
        return !!result;
      }}
      fullWidth
      multiple={false}
      onChange={(event: any, newValue: ISelectData | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        console.log("chamando o onchange pai");
        setFieldValue(name, newValue);
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
                  {setLabelOption(option)}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
