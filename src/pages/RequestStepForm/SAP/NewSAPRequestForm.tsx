/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import Box from "@mui/material/Box";
import * as React from "react";

import {
  FormikStep,
  FormikStepper,
} from "../../../components/controlsformik/Form/FormikStepper";
import EmployeeForm from "../components/Employee/EmployeeForm";
import SAPRequestForm from "../components/SAP/SAPRequestForm";
import SAPSubmitForm from "../components/SAP/SAPSubmitForm";
import {
  EMPLOYEE_FORM_VALIDATION,
  SAP_FORM_VALIDATION,
  INITIAL_SAP_FORM_STATE,
} from "../components/ValidationSchemas";

interface ICreateSAPRequest {
  user: {
    service_id: string;
    service_description: string;
    environment: string;
    is_new_user: boolean;
    user_id: string;
    reused_user_id_license: string;
    observation: string;
  };
  profiles: {
    service_id: string;
    service_description: string;
    environment: string;
    is_new_user: boolean;
    user_id: string;
    is_job_postion: boolean;
    job_position: string;
    profile_name: string;
    profile_description: string;
    is_profile_temporary: boolean;
    profile_valide_at: Date;
    profile_expires_at: Date;
    has_conflict: boolean;
    restricted_access: boolean;
  }[];
}

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

export function NewSAPRequestForm(): JSX.Element {
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
        initialValues={{ ...INITIAL_SAP_FORM_STATE }}
        onSubmit={async (values, actions) => {
          try {
            await sleep(3000);
            console.log("values", values.data);
            // POST request using fetch with async/await
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values.data),
            };
            const response = await fetch(
              "http://localhost:3333/requests/sap",
              requestOptions
            );
            const data = await response.json();
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
        <FormikStep label="serviço SAP" validationSchema={SAP_FORM_VALIDATION}>
          <SAPRequestForm />
        </FormikStep>
        <FormikStep label="ZSOD">Justificativa ZSOD</FormikStep>
        <FormikStep label="Fim">
          <SAPSubmitForm />
        </FormikStep>
      </FormikStepper>
    </Box>
  );
}
