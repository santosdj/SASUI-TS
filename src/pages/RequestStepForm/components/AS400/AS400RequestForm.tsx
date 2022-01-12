import Grid from "@mui/material/Grid";
import { useFormikContext } from "formik";
import React from "react";

import Controls from "../../../../components/controlsformik/FormikControls";
import * as as400RequestServices from "../../../../services/data/AS400RequestServices";
import { EServiceIds as ServiceId } from "../../../../services/data/AS400RequestServices";
import { IRequestEmployee, IAS400RoutineData } from "../Interface";
import AS400RequestTable from "./AS400RequestTable";

export default function AS400RequestForm(): JSX.Element {
  const { values, setFieldValue } = useFormikContext<IRequestEmployee>();
  const { as400 } = values;

  const setAccess = (access: {
    inc: boolean;
    exc: boolean;
    alt: boolean;
    con: boolean;
  }) => {
    const include = access.inc ? "S" : "N";
    const exclude = access.exc ? "S" : "N";
    const change = access.alt ? "S" : "N";

    return `${include} ${exclude} ${change}`;
  };

  const handleAddJobPositionClick = async (
    company: string,
    branchs: string[],
    regions: string[]
  ) => {
    const profile = await as400RequestServices.getAS400JobPosition(
      as400.job_position.id
    );
    const rows = profile.map((value, index) => {
      const item = {
        id: index,
        service_type: as400.service_type.id,
        environment: as400.environment.id,
        user_id: as400.user_id.id,
        system: value.system_id,
        routine: value.routine_id,
        security_type: value.access_type,
        security_company: value.company === "XX" ? company : value.company,
        security_branchs: value.branch === "XXX" ? branchs : value.branch,
        security_regions: value.region === "XXX" ? regions : "",
        security_text: "",
        job_position: as400.job_position.id,
        access: `${value.inc}${value.exc}${value.alt}`,
      };
      return item;
    });
    console.log("new array");
    console.log(rows);
    setFieldValue("as400.table", [...rows]);
  };

  const handleUpdateAS400Table = (
    ids: number[],
    company?: string,
    branchs?: string[],
    regions?: string[],
    access?: { inc: boolean; exc: boolean; alt: boolean; con: boolean }
  ) => {
    const { table } = as400;

    if (table) {
      console.log(ids);
      console.log(table);
      ids.forEach((id) => {
        console.log(id);
        const pos = id - 1;
        table[pos].security_company = company || table[pos].security_company;
        table[pos].security_branchs = branchs || table[pos].security_branchs;
        table[pos].security_regions = regions || table[pos].security_regions;
        table[pos].access = access ? setAccess(access) : table[pos].access;
      });
    }
    setFieldValue("as400.table", table);
  };

  const handleAddAS400Table = (
    company: string,
    branchs: string[],
    regions: string[],
    access: { inc: boolean; exc: boolean; alt: boolean; con: boolean }
  ) => {
    const {
      service_type,
      environment,
      user_id,
      system,
      routines,
      is_job_position,
    } = as400;

    if (is_job_position.id === "S") {
      handleAddJobPositionClick(company, branchs, regions);
    } else {
      const addroutines = routines?.map((value: IAS400RoutineData) => {
        const item = {
          id: 0,
          service_type: service_type.id,
          environment: environment.id,
          user_id: user_id.id,
          system: system.id,
          routine: value.id,
          security_type: value.access_type,
          security_company: company,
          security_branchs: branchs,
          security_regions: regions,
          security_text: value.access_observation
            ? value.access_observation
            : "",
          job_position: "",
          access: setAccess(access),
        };
        return item;
      });

      const table = [...as400.table, ...addroutines];
      console.log(table);

      const uniqueData = Array.from(
        table
          .reduce(
            (map, obj) =>
              map.set(
                `${obj.system}${obj.routine}${obj.security_company}${obj.security_branchs}`,
                obj
              ),
            new Map()
          )
          .values()
      );
      // const i = 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      uniqueData.sort((a: any, b: any) => a.routine - b.routine);
      const fixId = uniqueData.map((value, index) => {
        // eslint-disable-next-line no-param-reassign
        value.id = index + 1;
        return value;
      });

      setFieldValue("as400.table", [...fixId]);
    }
  };

  const handleInputAS400TableItemRemoval = (id: number[]) => {
    const new_table = as400.table.filter((value) => {
      const index = id.indexOf(value.id);
      return index < 0;
    });

    new_table.map((value, index) => {
      // eslint-disable-next-line no-param-reassign
      value.id = index + 1;
      return value;
    });
    setFieldValue("as400.table", [...new_table]);
  };

  React.useEffect(() => {
    if (as400.service_type?.id === ServiceId.ExcludeProfile) {
      setFieldValue("as400.user_type", { id: "N", description: "Não" });
    }
  }, [as400.service_type]);

  React.useEffect(() => {
    setFieldValue("as400.branch", { id: "", description: "" });
  }, [as400.company]);

  React.useEffect(() => {
    if (as400.user_type?.id === "S")
      setFieldValue("as400.user_id", {
        id: "NovoUsuario",
        description: "Novo Usuário",
      });
    else if (as400.user_id?.id === "NovoUsuario")
      setFieldValue("as400.user_id", {
        id: "",
        description: "",
      });
  }, [as400.user_type]);

  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item xs={6}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Controls.InputSelect
              name="as400.service_type"
              label="Serviço AS400"
              getOptions={as400RequestServices.getAS400ServiceTypeCollection}
              labelWithId
              editMode
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.InputSelect
              name="as400.environment"
              label="Ambiente"
              labelWithId
              getOptions={as400RequestServices.getAS400EnvironmentCollection}
              editMode
            />
          </Grid>
          <Grid item xs={2}>
            <Controls.InputSelect
              name="as400.user_type"
              label="Novo Usuário"
              getOptions={as400RequestServices.getAS400UserTypeCollection}
              labelWithId={false}
              editMode
              // editMode={service_type.id !== ServiceId.ExcludeProfile}
            />
          </Grid>
        </Grid>
        {as400?.service_type?.id !==
          as400RequestServices.EServiceIds.CopyUser && (
          <>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Controls.InputSelect
                  name="as400.is_job_position"
                  label="Indicar Perfil"
                  getOptions={as400RequestServices.getAS400YesNoCollection}
                  labelWithId={false}
                  editMode
                />
              </Grid>
              {as400.is_job_position?.id === "S" && (
                <Grid item xs={10}>
                  <Controls.InputSelect
                    name="as400.job_position"
                    label="Perfil"
                    getOptions={
                      as400RequestServices.getAS400JobPositionCollection
                    }
                    labelWithId={false}
                    editMode
                  />
                </Grid>
              )}

              {as400.is_job_position?.id === "N" && (
                <>
                  <Grid item xs={10}>
                    <Controls.InputSelect
                      name="as400.system"
                      label="Sistema"
                      getOptions={as400RequestServices.getAS400SystemCollection}
                      labelWithId
                      editMode
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </>
        )}
      </Grid>

      <Grid item xs={6}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            {as400?.user_type?.id !== "S" && (
              <Controls.InputAutoComplete
                label="User Id"
                getOptions={as400RequestServices.getAS400UsersByNameCollection}
                name="as400.user_id"
                labelWithId
                helperText=""
              />
            )}
            {as400?.user_type?.id === "S" && (
              <Controls.InputText
                name="as400.user_id"
                label="User Id"
                fullWidth
                inputProps={{
                  readOnly: true,
                }}
              />
            )}
          </Grid>

          {as400.service_type?.id ===
            as400RequestServices.EServiceIds.CopyUser && (
            <Grid item xs={6}>
              <Controls.InputAutoComplete
                name="as400.user_id_source"
                label="User Id Origem"
                labelWithId
                getOptions={as400RequestServices.getAS400UsersByNameCollection}
                helperText=""
                disabledOptions={[as400.user_id]}
              />
            </Grid>
          )}
        </Grid>
        {as400.service_type?.id !== as400RequestServices.EServiceIds.CopyUser &&
          as400.is_job_position?.id === "N" && (
            <Grid container spacing={1}>
              <Grid item xs={11}>
                <Controls.CheckBoxAutoComplete
                  label="Rotina"
                  getOptions={as400RequestServices.getAS400RoutineCollection}
                  name="as400.routines"
                  labelWithId
                  helperText=""
                  parentValue={as400.system.id}
                />
              </Grid>
            </Grid>
          )}
      </Grid>

      {as400?.service_type &&
        as400.service_type.id !== as400RequestServices.EServiceIds.CopyUser && (
          <>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <AS400RequestTable
                    rows={as400.table}
                    removeProfile={handleInputAS400TableItemRemoval}
                    updateProfile={handleUpdateAS400Table}
                    addProfiles={handleAddAS400Table}
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
    </Grid>
  );
}
