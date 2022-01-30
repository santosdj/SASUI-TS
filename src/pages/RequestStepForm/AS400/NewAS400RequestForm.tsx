/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import Box from "@mui/material/Box";
import * as React from "react";

import {
  FormikStep,
  FormikStepper,
} from "../../../components/controlsformik/Form/FormikStepper";
import RequestService from "../../../services/request.service";
import AS400RequestForm from "../components/AS400/AS400RequestForm";
import AS400SubmitForm from "../components/AS400/AS400SubmitForm";
import EmployeeForm from "../components/Employee/EmployeeForm";
import {
  EMPLOYEE_FORM_VALIDATION,
  AS400_FORM_VALIDATION,
  INITIAL_AS400_FORM_STATE,
} from "../components/ValidationSchemas";

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

export function NewAS400RequestForm(): JSX.Element {
  return (
    <Box
      sx={{
        marginTop: "4px",
        "& .MuiTextField-root": { m: 1, minWidth: "30px" },
        "& .MuiInputBase-root": { m: 1, minWidth: "30px" },
        "& .MuiDataGrid-root": { m: 1, minWidth: "30px" },
      }}
    >
      <FormikStepper
        initialValues={{ ...INITIAL_AS400_FORM_STATE }}
        onSubmit={async (values, actions) => {
          try {
            await sleep(3000);
            console.log("values", values.data);
            const response = await RequestService.sendAS400Request(values.data);
            const { data } = response;
            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              actions.setStatus({ isError: true, error });
            } else actions.setStatus({ isError: false, data });
            actions.setSubmitting(false);
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <FormikStep
          label="dados do colaborador"
          validationSchema={EMPLOYEE_FORM_VALIDATION}
        >
          <EmployeeForm />
        </FormikStep>
        <FormikStep
          label="serviço AS400"
          validationSchema={AS400_FORM_VALIDATION}
        >
          <AS400RequestForm />
        </FormikStep>
        <FormikStep label="Fim">
          <AS400SubmitForm />
        </FormikStep>
      </FormikStepper>
    </Box>
  );
}
