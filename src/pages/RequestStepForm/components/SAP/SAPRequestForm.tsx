import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useFormikContext } from "formik";
import React from "react";

import Controls from "../../../../components/controlsformik/FormikControls";
import * as sapRequestServices from "../../../../services/data/SAPRequestServices";
import { EServiceIds as ServiceId } from "../../../../services/data/SAPRequestServices";
import { ISelectData, IRequestEmployee } from "../Interface";
import SAPRequestTable from "./SAPRequestTable";

export default function SAPRequestForm(): JSX.Element {
  const JOB_POSITION = "2";
  const { values, setFieldValue, isValid, errors } =
    useFormikContext<IRequestEmployee>();

  const { request, sap } = values;

  const handleInputSAPRemoveProfile = (id: number) => {
    if (values?.sap?.profiles_table) {
      const profiles_table = [...values?.sap?.profiles_table];
      const profileToRemove = profiles_table.find((value) => value.id === id);

      const new_profiles_table = profiles_table.filter(
        (value) => value.id !== id
      );

      new_profiles_table.map((value, index) => {
        // eslint-disable-next-line no-param-reassign
        value.id = index + 1;
        return value;
      });

      setFieldValue("sap.profiles_table", new_profiles_table);

      // updating the profiles field
      if (values.sap.profiles && profileToRemove) {
        const profiles = [...values.sap.profiles];

        const new_profiles = profiles.filter(
          (value) => value.id !== profileToRemove.profile
        );
        setFieldValue("sap.profiles", new_profiles);
      }
    }
  };

  const handleInputSAPAddProfile = (profiles: ISelectData[]) => {
    const addprofiles = profiles.map((profile) => {
      const item = {
        // eslint-disable-next-line no-plusplus
        id: 0,
        environment: values?.sap?.environment?.id,
        service_id: values?.sap?.service_type?.id,
        service_description: values?.sap?.service_type?.description,
        user_id: values?.sap?.user_id?.id,
        profile: profile.id,
        profile_description: profile.description,
        profile_type: values?.sap?.profile_type?.description,
        job_position:
          values?.sap?.profile_type?.id === "2"
            ? ""
            : values?.sap?.job_position?.id,
        is_temporary: values?.sap?.is_temporary?.id === "S",

        profile_start_date:
          values.sap?.is_temporary?.id === "S"
            ? values?.sap?.profile_start_date
            : "",
        profile_end_date:
          values.sap?.is_temporary?.id === "S"
            ? values?.sap?.profile_end_date
            : "",
      };
      return item;
    });

    const profiles_table = values?.sap?.profiles_table
      ? [...values.sap.profiles_table, ...addprofiles]
      : [...addprofiles];

    const uniqueData = Array.from(
      profiles_table
        .reduce((map, obj) => map.set(obj.profile, obj), new Map())
        .values()
    );
    const fixId = uniqueData.map((value, index) => {
      // eslint-disable-next-line no-param-reassign
      value.id = index + 1;
      return value;
    });

    setFieldValue("sap.profiles_table", fixId);
  };

  React.useEffect(() => {
    if (!request.updateEmployee) {
      // update the user only if finished to update employee data.
      // avoiding circular refreshing
      const usersap = request.employee_userid_sap;
      const user_type = { id: "", description: "" };
      const service_type = { id: "", description: "" };
      const user_id = { id: "", description: "" };
      if (sap?.environment?.id === "ECC") {
        console.log("environement = ECC");

        if (!request.employee?.id || !usersap) {
          user_type.id = "S";
          user_type.description = "Novo Usuário";
          service_type.id = "";
          service_type.description = "";
          user_id.id = "NovoUsuario";
          user_id.description = "Novo Usuário";
        } else {
          user_id.id = request.employee_userid_sap || "";
          user_id.description = request.employee.description || "";
          user_type.id =
            request.employee_userid_sap_status === "Ativo" ? "N" : "D";
          user_type.description =
            request.employee_userid_sap_status === "Ativo"
              ? "Existente"
              : "Desbloqueio";
        }
      } else {
        user_type.id = "";
        user_type.description = "";
        user_id.id = request.employee_userid_sap || "";
        user_id.description = request.employee.description || "";
      }

      setFieldValue("sap.user_type", user_type);
      setFieldValue("sap.service_type", service_type);
      setFieldValue("sap.user_id", user_id);
      setFieldValue("sap.profile_type", { id: "1", description: "Outros" });
      setFieldValue("sap.is_temporary", { id: "N", description: "Não" });
      setFieldValue("sap.profiles", []);
      setFieldValue("sap.profiles_table", []);
    }
  }, [sap?.environment, request.updateEmployee]);

  React.useEffect(() => {
    if (sap?.environment?.id !== "ECC") {
      const user_id = { id: "", description: "" };
      if (sap?.user_type?.id === "S") {
        user_id.description = "Novo Usuário";
        user_id.id = "NovoUsuario";
      } else {
        user_id.id = request.employee_userid_sap || "";
        user_id.description = request.employee.description || "";
      }
      setFieldValue("sap.user_id", user_id);
      setFieldValue("sap.profiles", []);
      setFieldValue("sap.profiles_table", []);
    }
  }, [sap?.user_type]);

  React.useEffect(() => {
    setFieldValue("sap.profiles", []);
  }, [sap?.service_type]);

  return (
    <>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Controls.InputSelect
                name="sap.environment"
                label="Ambiente SAP"
                labelWithId={false}
                getOptions={sapRequestServices.getSAPEnvironmentCollection}
                editMode
              />
            </Grid>
            <Grid item xs={8}>
              <Controls.InputSelect
                name="sap.service_type"
                label="Tipo Serviço"
                labelWithId
                getOptions={sapRequestServices.getSAPServiceTypeCollection}
                optionsPrimaryKey={
                  sap &&
                  sap.environment &&
                  sap.user_type &&
                  sap.environment.id === "ECC"
                    ? sap.user_type.id
                    : ""
                }
                editMode
              />
            </Grid>
          </Grid>
          {sap?.service_type && sap.service_type.id === ServiceId.AddProfile && (
            <>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Controls.InputSelect
                    name="sap.profile_type"
                    label="Tipo Perfil"
                    labelWithId={false}
                    getOptions={sapRequestServices.getSAPProfileTypeCollection}
                    editMode={request.has_sap_job_positions}
                  />
                </Grid>
                {sap?.profile_type && sap.profile_type.id === JOB_POSITION && (
                  <Grid item xs={4}>
                    <Controls.InputSelect
                      name="sap.job_position"
                      label="Job Position"
                      labelWithId={false}
                      defaultOptions={undefined}
                      editMode
                    />
                  </Grid>
                )}
                {sap?.profile_type && sap?.profile_type?.id !== JOB_POSITION && (
                  <>
                    <Grid item xs={2}>
                      <Controls.InputSelect
                        name="sap.is_temporary"
                        label="Temporário"
                        labelWithId={false}
                        getOptions={
                          sapRequestServices.getSAPTemporyFieldCollection
                        }
                        editMode
                      />
                    </Grid>
                  </>
                )}
                {sap?.profile_type &&
                  sap.is_temporary &&
                  sap.profile_type.id !== JOB_POSITION &&
                  sap.is_temporary.id === "S" && (
                    <>
                      <Grid item xs={3}>
                        <Controls.InputDatePicker
                          label="De"
                          name="sap.profile_start_date"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Controls.InputDatePicker
                          label="Até"
                          name="sap.profile_end_date"
                        />
                      </Grid>
                    </>
                  )}
              </Grid>
            </>
          )}

          {sap?.profile_type &&
            sap?.service_type &&
            sap.profile_type.id !== "2" &&
            (sap.service_type.id === ServiceId.AddProfile ||
              sap.service_type.id === ServiceId.ExcludeProfile) &&
            isValid && (
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Controls.InputSAPProfiles
                    name="sap.profiles"
                    label="Perfil"
                    placeHolder="Digite a descrição ou código de um perfil"
                    parentValue={sap?.environment?.id || ""}
                    editMode
                    addToTable
                    handleProfileChange={handleInputSAPAddProfile}
                    disabledOptions={
                      sap.profiles_table
                        ? sap.profiles_table?.map((profile) => {
                            const obj = {
                              id: profile.profile,
                              description: profile.profile_description,
                              email: "",
                            };
                            return obj;
                          })
                        : []
                    }
                  />
                </Grid>
              </Grid>
            )}
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Controls.InputSelect
                name="sap.user_type"
                label="Usuario"
                labelWithId={false}
                getOptions={sapRequestServices.getSAPUserTypeCollection}
                optionsPrimaryKey={sap?.service_type?.id}
                editMode={sap?.environment?.id !== "ECC"}
              />
            </Grid>
            <Grid item xs={8}>
              <Controls.InputSelect
                name="sap.user_id"
                label="User ID"
                labelWithId
                getOptions={sapRequestServices.getSAPUserIdCollection}
                optionsPrimaryKey={sap?.environment?.id}
                editMode={
                  sap?.environment?.id !== "ECC" && sap?.user_type?.id !== "S"
                }
              />
            </Grid>
          </Grid>
          {sap?.environment?.id === "ECC" && sap?.user_type?.id === "S" && (
            <>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Controls.InputText
                    name="sap.user_licence"
                    label="Reutilizar licença"
                    fullWidth
                    inputProps={{
                      readOnly: false,
                    }}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
        {(sap?.service_type?.id === ServiceId.AddProfile ||
          sap?.service_type?.id === ServiceId.ExcludeProfile) && (
          <>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <SAPRequestTable
                    rows={sap?.profiles_table}
                    removeProfile={handleInputSAPRemoveProfile}
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}

/*
      <Button
        variant="contained"
        onClick={() => {
          console.log(values);
          console.log(errors);
        }}
      >
        show values
      </Button> */
