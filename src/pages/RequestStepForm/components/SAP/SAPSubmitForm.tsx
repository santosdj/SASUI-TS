/* eslint-disable react/jsx-props-no-spreading */
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useFormikContext } from "formik";
import React from "react";

import { EServiceIds } from "../../../../services/data/SAPRequestServices";
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

interface ISAPUserRequest {
  service_id: string;
  service_description: string;
  environment: string;
  is_new_user: boolean;
  user_id: string;
  reused_user_id_license: string;
  observation: string;
}

export default function SAPSubmitForm(): JSX.Element {
  const setRequestType = () => {
    return "SAP";
  };

  const { values, setFieldValue, status } =
    useFormikContext<IRequestEmployee>();

  const { request, sap } = values;
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

    const user: ISAPUserRequest = {
      service_id: "",
      service_description: "",
      environment: "",
      is_new_user: false,
      user_id: "",
      reused_user_id_license: "",
      observation: "",
    };

    if (sap.service_type.id === EServiceIds.BlockUser) {
      user.service_id = EServiceIds.BlockUser;
      user.service_description = "Bloqueio de Usuário";
      user.environment = sap.environment.id;
      user.is_new_user = false;
      user.user_id = sap.user_id.id;
      user.reused_user_id_license = sap.user_licence;
      user.observation = "";
      return {
        employee,
        user,
      };
    }
    if (sap.user_type.id === "S") {
      user.service_id = EServiceIds.CreateUser;
      user.environment = sap.environment.id;
      user.service_description = "Criação de Usuário";
      user.is_new_user = true;
      user.user_id = sap.user_id.id;
      user.reused_user_id_license = sap.user_licence;
      user.observation = "";
    }
    if (sap.user_type.id === "D") {
      user.service_id = EServiceIds.UnBlockUser;
      user.service_description = "Desbloqueio de Usuário";
      user.environment = sap.environment.id;
      user.is_new_user = false;
      user.user_id = sap.user_id.id;
      user.reused_user_id_license = sap.user_licence;
      user.observation = "";
    }

    const profiles = sap.profiles_table?.map((row) => {
      return {
        service_id: row.service_id,
        service_description: row.service_description,
        environment: row.environment,
        is_new_user: user.is_new_user,
        user_id: row.user_id,
        is_job_postion: row.job_position !== "",
        job_position: row.job_position,
        profile_name: row.profile,
        profile_description: row.profile_description,
        is_profile_temporary: row.is_temporary,
        profile_valide_at: new Date(row.profile_start_date),
        profile_expires_at: new Date(row.profile_end_date),
        has_conflict: false,
        restricted_access: false,
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
        <Alert severity="info">
          Clique em enviar para registrar sua solicitação
        </Alert>
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
