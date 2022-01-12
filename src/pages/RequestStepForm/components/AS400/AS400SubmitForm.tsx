/* eslint-disable react/jsx-props-no-spreading */
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useField, useFormikContext } from "formik";
import React from "react";

import { EServiceIds } from "../../../../services/data/AS400RequestServices";
import AS400Table from "../../../Request/components/AS400Table";
import { IRequestEmployee } from "../Interface";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ICreateSASRequestDTO {
  requested_by_id: string;
  requested_by_name: string;
  requested_by_email: string;
  request_number: string;
  request_status: number;
  request_type: string;
  request_observation: string;
  request_copy_list: string;
  employee_id: string;
  employee_fullname: string;
  employee_email: string;
  employee_type: string;
  employee_type_description: string;
  employee_profile_edition_rule: string;
  employee_role_id: string;
  employee_role_description: string;
  employee_plataform_id: string;
  employee_plataform_description: string;
  employee_costcenter_id: string;
  employee_costcenter_description: string;
  employee_company_id: string;
  employee_company_description: string;
  employee_branch_id: string;
  employee_branch_description: string;
  employe_manager_id: string;
  employee_manager_name: string;
  employee_login: string;
  employee_sap_id: string;
  employee_userid_sap_status: string;
  employee_userid_sap_expiration_date: string;
  employee_as400_id: string;
  employee_userid_as400_description: string;
  updateEmployee: boolean;
}

interface IAS400UserRequest {
  service_id: string;
  service_description: string;
  environment: string;
  is_new_user: boolean;
  user_id: string;
  reused_user_id_license: string;
  observation: string;
  copy_user_id: string;
  copy_user_id_status: string;
}

export default function AS400SubmitForm(): JSX.Element {
  const setRequestType = () => {
    return "AS400";
  };

  const { values, setFieldValue, status } =
    useFormikContext<IRequestEmployee>();

  const { request, as400 } = values;
  const createJson = () => {
    const employee: ICreateSASRequestDTO = {
      requested_by_id: request.request_by ? request.request_by : "",
      requested_by_name: request.request_by ? request.request_by : "",
      requested_by_email: request.request_by ? request.request_by : "",
      request_number: "",
      request_status: -1,
      request_type: setRequestType(),
      request_observation: request.request_observation,
      request_copy_list: "falta",
      employee_id: request.employee.id,
      employee_fullname: request.employee.description,
      employee_email: request.employee.email ? request.employee.email : "",
      employee_type: request.employee_type ? request.employee_type.id : "",
      employee_type_description: request.employee_type
        ? request.employee_type.description
        : "",
      employee_profile_edition_rule: request.employee_profile_edition_rule,
      employee_role_id: request.employee_role ? request.employee_role.id : "",
      employee_role_description: request.employee_role
        ? request.employee_role.description
        : "",
      employee_plataform_id: request.employee_plataform
        ? request.employee_plataform.id
        : "",
      employee_plataform_description: request.employee_plataform
        ? request.employee_plataform.description
        : "",
      employee_costcenter_id: request.employee_costcenter
        ? request.employee_costcenter.id
        : "",
      employee_costcenter_description: request.employee_costcenter
        ? request.employee_costcenter.description
        : "",
      employee_company_id: request.employee_company
        ? request.employee_company.id
        : "",
      employee_company_description: request.employee_company
        ? request.employee_company.description
        : "",
      employee_branch_id: request.employee_branch
        ? request.employee_branch.id
        : "",
      employee_branch_description: request.employee_branch
        ? request.employee_branch.description
        : "",
      employe_manager_id: request.employee_manager
        ? request.employee_manager.id
        : "",
      employee_manager_name: request.employee_manager
        ? request.employee_manager.description
        : "",
      employee_login: request.employee_userid_login
        ? request.employee_userid_login
        : "",
      employee_sap_id: request.employee_userid_sap
        ? request.employee_userid_sap
        : "",
      employee_userid_sap_status: request.employee_userid_sap_status
        ? request.employee_userid_sap_status
        : "",
      employee_userid_sap_expiration_date: request.employee_userid_sap_status
        ? request.employee_userid_sap_status
        : "",
      employee_as400_id: "",
      employee_userid_as400_description: "",
      updateEmployee: request.updateEmployee ? request.updateEmployee : false,
    };

    const user: IAS400UserRequest = {
      service_id: "",
      service_description: "",
      environment: "",
      is_new_user: false,
      user_id: "",
      reused_user_id_license: "",
      observation: "",
      copy_user_id: "",
      copy_user_id_status: "-1",
    };

    if (as400.service_type.id === EServiceIds.CopyUser) {
      user.environment = as400.environment.id;
      user.is_new_user = as400.user_type.id === "S";
      user.user_id = as400.user_id.id;
      user.reused_user_id_license = as400.user_licence;
      user.observation = "";

      user.copy_user_id = as400.user_id_source.id;
      user.copy_user_id_status = "";
      user.service_id = EServiceIds.CopyUser;
      user.service_description = "Duplicação de Acesso";
      return {
        employee,
        user,
      };
    }

    if (as400.user_type.id === "S") {
      user.environment = as400.environment.id;
      user.is_new_user = true;
      user.user_id = as400.user_id.id;
      user.reused_user_id_license = as400.user_licence;
      user.observation = "";
      user.service_id = EServiceIds.CreateUser;
      user.service_description = "Criação de Usuário";
    }

    const profiles = as400.table?.map((row) => {
      return {
        service_id: row.service_type,
        service_description:
          row.service_type === EServiceIds.AddProfile
            ? "Liberação de Acesso"
            : "Exclusão de Acesso",
        environment: row.environment,
        is_new_user: user.is_new_user,
        user_id: row.user_id,
        system: row.system,
        routine: row.routine,
        access_type: row.security_type,
        access_observation: row.security_text,
        limited_access: false,
        restricted_access: false,
        access: row.access,
        company_id: row.security_type === "EF" ? row.security_company : "",
        company_name: row.security_type === "EF" ? row.security_company : "",
        branch_id: row.security_type === "EF" ? row.security_branchs[0] : "",
        branch_name: "",
        region_id: row.security_type === "R" ? row.security_regions[0] : "",
        region_name: "",
        job_position: row.job_position,
      };
    });

    return user.service_id === ""
      ? {
          employee,
          profiles,
        }
      : {
          employee,
          user,
          profiles,
        };
  };

  React.useEffect(() => {
    const data = createJson();
    setFieldValue("data", data);
  }, []);

  const [field] = useField("data");
  const rows = field.value ? [field.value.user, ...field.value.profiles] : [];
  return (
    <Stack
      spacing={2}
      sx={{
        width: "100%",
        marginTop: "120px",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!status && (
        <>
          <Alert severity="info">
            Clique em enviar para registrar sua solicitação
          </Alert>

          {field.value && (
            <AS400Table
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              rows={rows.map((row: any, index: number) => {
                return { ...row, id: index };
              })}
            />
          )}
        </>
      )}
      {status && status?.isError && (
        <Alert severity="error">{status.error}</Alert>
      )}
      {status && !status?.isError && (
        <Alert severity="success">
          Solicitação criada com sucesso: {status.data.request_number}
        </Alert>
      )}
    </Stack>
  );
}
