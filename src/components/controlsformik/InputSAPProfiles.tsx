/* eslint-disable react/jsx-props-no-spreading */
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useField, useFormikContext } from "formik";
// eslint-disable-next-line import/no-extraneous-dependencies
import throttle from "lodash/throttle";
import * as React from "react";

import { ISelectData } from "../../pages/RequestStepForm/components/Interface";
import * as sapRequestServices from "../../services/data/SAPRequestServices";

interface IProps {
  name: string;
  label: string;
  placeHolder: string;
  parentValue: string | "ECC";
  editMode: boolean;
  addToTable: boolean;
  handleProfileChange: (values: ISelectData[]) => void;
  disabledOptions: ISelectData[];
}

interface IError {
  error?: boolean;
  helperText?: string;
}

export default function InputSAPProfiles({
  name,
  label,
  placeHolder,
  parentValue,
  addToTable,
  handleProfileChange,
  disabledOptions,
}: IProps): JSX.Element {
  const [options, setOptions] = React.useState<readonly ISelectData[]>([]);
  // const [value, setValue] = React.useState<ISelectData[]>([]);

  const [field, mata] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [inputValue, setInputValue] = React.useState("");

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
          callback: (results?: readonly ISelectData[]) => void
        ) => {
          const data = await sapRequestServices.getSAProfileCollection(
            parentValue,
            request.input,
            "20"
          );
          callback(data);
        },
        200
      ),
    [parentValue]
  );

  React.useEffect(() => {
    let active = true;

    // user typed nothing, therefore can not search
    if (inputValue === "") {
      setOptions(field.value || []);
      return undefined;
    }

    getResults({ input: inputValue }, (results?: readonly ISelectData[]) => {
      if (active) {
        let newOptions: readonly ISelectData[] = [];

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
      multiple
      id={name}
      {...field}
      inputValue={inputValue}
      options={options}
      getOptionLabel={(option) => `${option.id} - ${option.description}`}
      filterSelectedOptions
      onChange={(event: React.SyntheticEvent, value: ISelectData[]) => {
        setFieldValue(name, value);
        if (addToTable) {
          handleProfileChange(value);
        }
      }}
      onInputChange={(event: React.SyntheticEvent, newInputValue) => {
        setInputValue(newInputValue);
      }}
      getOptionDisabled={(option) => {
        const values = [...field.value, ...disabledOptions];
        const valueAlreadySelected = values.find((value) => {
          return value.id === option.id;
        });
        return !!valueAlreadySelected;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={`${label} ${parentValue}`}
          placeholder={placeHolder}
        />
      )}
    />
  );
}
