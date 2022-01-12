import Grid from "@mui/material/Grid";
import React from "react";

import InputReadText from "../../../components/controls/InputReadText";
import { IEmployee } from "../../RequestStepForm/components/Interface";

interface IRequestFormProps {
  values: IEmployee;
}

export default function EmployeeForm({
  values,
}: IRequestFormProps): JSX.Element {
  const {
    request_by,
    employee,
    request_date,
    employee_type,
    employee_role,
    employee_costcenter,
    employee_manager,
    request_number,
    request_status,
    employee_plataform,
    employee_company,
    employee_branch,
    request_observation,
  } = values;

  return (
    <>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <InputReadText
                name="request_by"
                label="Solicitante"
                fullWidth
                value={request_by || ""}
              />
              <InputReadText
                name="employee"
                label="Colaborador"
                fullWidth
                value={employee.description || ""}
              />
            </Grid>
            <Grid item xs={4}>
              <InputReadText
                name="request.request_date"
                label="Data da solicitação"
                fullWidth={false}
                value={request_date ? request_date.toLocaleString() : ""}
              />

              <InputReadText
                name="request.employee_type"
                label="Tipo"
                value={employee_type?.description || ""}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <InputReadText
                name="request.employee_role"
                label="Cargo"
                value={
                  employee_role
                    ? `${employee_role.id}-${employee_role.description}`
                    : ""
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputReadText
                name="request.employee_costcenter"
                label="Centro de Custo"
                value={
                  employee_costcenter
                    ? `${employee_costcenter.id}-${employee_costcenter.description}`
                    : ""
                }
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <InputReadText
                name="request.employee_manager"
                label="Gestor"
                value={employee_manager?.description || ""}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <InputReadText
                name="request.request_number"
                label="Número"
                fullWidth={false}
                value={request_number || ""}
              />

              <InputReadText
                name="request.request_status"
                label="Status"
                fullWidth={false}
                value={request_status || ""}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <InputReadText
                name="request.employee"
                label="Email"
                fullWidth
                value={employee.email || ""}
              />
            </Grid>
            <Grid item xs={4}>
              <InputReadText
                name="request.employee_plataform"
                label="Plataforma"
                fullWidth
                value={employee_plataform?.description || ""}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <InputReadText
                name="request.employee_company"
                label="Empresa"
                fullWidth
                value={
                  employee_company
                    ? `${employee_company.id}-${employee_company.description}`
                    : ""
                }
              />
            </Grid>
            <Grid item xs={7}>
              <InputReadText
                name="request.employee_branch"
                label="Filial"
                fullWidth
                value={
                  employee_branch
                    ? `${employee_branch.id}-${employee_branch.description}`
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={11}>
              <InputReadText
                name="request.request_observation"
                label="Observação"
                multiline
                maxRows={4}
                fullWidth
                value={request_observation}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
/* <pre>{JSON.stringify({ values }, null, 4)}</pre> */
