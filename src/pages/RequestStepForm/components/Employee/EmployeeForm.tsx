import Grid from "@mui/material/Grid";
import { useFormikContext } from "formik";
import React from "react";

import Controls from "../../../../components/controlsformik/FormikControls";
import * as employeeservice from "../../../../services/data/EmployeeService";
import * as requestServices from "../../../../services/data/RequestServices";
import { IRequestEmployee } from "../Interface";

export default function EmployeeForm(): JSX.Element {
  const { values, setValues } = useFormikContext<IRequestEmployee>();

  const { request } = values;

  const canEditEmployeeFields = () => {
    const rule = request.employee_profile_edition_rule;
    if (rule === "ALL") return true;
    if (request.is_contingency) return true;
    if (rule === "NONE") return false;
    if (rule === "ERROR") return true;
    return false;
  };

  const canEditManagerField = () => {
    const rule = request.employee_profile_edition_rule;
    if (rule === "ALL") return true;
    if (rule === "MANAGER") return true;
    if (request.is_contingency) return true;
    if (rule === "ERROR") return true;
    return false;
  };

  React.useEffect(() => {
    async function updateForm(id: string) {
      console.log(`loading new values ${id}`);
      const employee = await employeeservice.getEmployeeValues(id);
      console.log(employee);

      const newValues: IRequestEmployee = {
        ...values,
        request: { ...values.request, ...employee },
      };
      setValues(newValues, true);
    }
    const id = request.employee ? request.employee.id : "";
    if (request.updateEmployee) {
      updateForm(id);
    }
  }, [request.updateEmployee]);

  return (
    <>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Controls.InputText
                name="request.request_by"
                label="Solicitante"
                fullWidth
                inputProps={{
                  readOnly: true,
                }}
              />
              <Controls.InputEmployee
                name="request.employee"
                label="Colaborador"
                labelWithId={false}
                helperText="Digite o nome do colaborador"
                getOptions={requestServices.getEmployeeByNameCollection}
                setLabelOption={requestServices.setEmployeeNameOption}
                setLabelHintOptions={requestServices.setEmployeeHintNameOptions}
              />
            </Grid>
            <Grid item xs={4}>
              <Controls.InputText
                name="request.request_date"
                label="Data da solicitação"
                fullWidth={false}
                inputProps={{
                  readOnly: true,
                }}
              />

              <Controls.InputSelect
                name="request.employee_type"
                label="Tipo"
                getOptions={requestServices.getEmployeeTypeCollection}
                labelWithId={false}
                editMode={canEditEmployeeFields()}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Controls.InputSelect
                name="request.employee_role"
                label="Cargo"
                labelWithId
                getOptions={requestServices.getRoleCollection}
                editMode={canEditEmployeeFields()}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.InputSelect
                name="request.employee_costcenter"
                label="Centro de Custo"
                labelWithId
                getOptions={requestServices.getCostCenterCollection}
                editMode={canEditEmployeeFields()}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Controls.InputSelect
                name="request.employee_manager"
                label="Gestor"
                labelWithId={false}
                getOptions={requestServices.getManagerCollection}
                editMode={canEditManagerField()}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Controls.InputText
                name="request.request_number"
                label="Número"
                fullWidth={false}
                inputProps={{
                  readOnly: true,
                }}
              />

              <Controls.InputText
                name="request.request_status"
                label="Status"
                fullWidth={false}
                inputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Controls.InputEmployee
                name="request.employee"
                label="Email"
                getOptions={requestServices.getEmployeeByNameCollection}
                labelWithId={false}
                helperText="Digite um email"
                setLabelOption={requestServices.setEmployeeEmailOption}
                setLabelHintOptions={
                  requestServices.setEmployeeHintEmailOptions
                }
              />
            </Grid>
            <Grid item xs={4}>
              <Controls.InputSelect
                name="request.employee_plataform"
                label="Plataforma"
                labelWithId={false}
                getOptions={requestServices.getPlataformCollection}
                editMode={canEditEmployeeFields()}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Controls.InputSelect
                name="request.employee_company"
                label="Empresa"
                labelWithId
                getOptions={requestServices.getCompanyOnlyCollection}
                onChangeCleanFieldName="employee_branch"
                editMode={canEditEmployeeFields()}
              />
            </Grid>
            <Grid item xs={7}>
              <Controls.InputSelect
                name="request.employee_branch"
                label="Filial"
                labelWithId
                getOptions={requestServices.getCompanyBranchCollection}
                optionsPrimaryKey={
                  request.employee_company
                    ? request.employee_company.id
                    : undefined
                }
                editMode={canEditEmployeeFields()}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={11}>
              <Controls.InputText
                name="request.request_observation"
                label="Observação"
                multiline
                maxRows={4}
                fullWidth
                inputProps={{
                  readOnly: false,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
