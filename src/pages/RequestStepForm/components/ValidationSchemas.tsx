/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";

import { IEmployee, IRequestSAP, IRequestAS400 } from "./Interface";

const select_object = Yup.object()
  .shape({
    id: Yup.string().default("").ensure(),
    description: Yup.string().default("").ensure(),
  })
  .default({ id: "", description: "" });

const test_select_object = (name: string, msg: string) => {
  return select_object.test(name, msg, (val: any) => {
    return val ? !!val.id : false;
  });
};

const default_object_shape = Yup.object()
  .shape({
    id: Yup.string().default(""),
    description: Yup.string().default(""),
  })
  .default({ id: "", description: "" });

export const INITIAL_EMPLOYEE_FORM_STATE = {
  id: "0",
  request_by: "Darcio Santos",
  request_status: "Rascunho",
  request_date: new Date(),
  request_number: "--",
  request_opentab: 0,
  request_observation: "",
  is_contingency: false,
  employee_profile_edition_rule: "ALL",
  employee_role: { id: "", description: "" },
  employee_plataform: { id: "", description: "" },
  employee_costcenter: { id: "", description: "" },
  request_category: { id: "", description: "" },
  employee_type: { id: "", description: "" },
  employee_manager: { id: "", description: "" },
  employee_company: { id: "", description: "" },
  employee_branch: { id: "", description: "" },
  employee: {
    id: "",
    description: "",
    email: "",
  },
  updateEmployee: false,
  has_sap_job_positions: false,
  employee_sap_job_positions: [],
  employee_userid_login: "",
  employee_userid_as400: { id: "", description: "" },
  employee_userid_sap: "",
  employee_userid_sap_status: "",
  employee_userid_sap_expiration_date: "",
};

export const INITIAL_SAP_FORM_STATE = {
  request: INITIAL_EMPLOYEE_FORM_STATE,
  sap: {
    environment: { id: "ECC", description: "ECC-Produção" },
    service_type: { id: "", description: "" },
    user_type: { id: "", description: "" },
    user_id: { id: "", description: "" },
    user_licence: "",
    is_job_position: false,
    job_position: { id: "", description: "" },
    is_temporary: { id: "", description: "" },
    profile_type: { id: "", description: "" },
    profile_start_date: "",
    profile_end_date: "",
    profiles: [],
    profiles_table: [],
  },
};

export const INITIAL_AS400_FORM_STATE = {
  request: INITIAL_EMPLOYEE_FORM_STATE,
  as400: {
    environment: { id: "BRCOISP1", description: "Produção" },
    service_type: {
      id: "",
      description: "",
    },
    user_type: { id: "N", description: "Não" },
    user_licence: "",
    user_id: { id: "", description: "" },
    user_id_source: { id: "", description: "" },
    is_job_position: { id: "N", description: "Não" },
    job_position: { id: "", description: "" },
    system: { id: "", description: "" },
    routines: [],
    company: { id: "", description: "" },
    branch: { id: "", description: "" },
    region: { id: "", description: "" },
    access: { inc: true, exc: true, alt: true, con: true },
    table: [],
  },
};

export const EMPLOYEE_VALIDATION: Yup.SchemaOf<IEmployee> = Yup.object().shape({
  id: Yup.string().required("Campo obrigatório"),
  request_by: Yup.string().default("").optional(),
  request_status: Yup.string().default("").optional(),
  request_date: Yup.date().optional(),
  request_number: Yup.string().required(),
  request_opentab: Yup.number().required(),
  request_observation: Yup.string().default("").optional(),
  request_category: Yup.object()
    .shape({
      id: Yup.string(),
      description: Yup.string(),
    })
    .nullable()
    .optional(),
  is_contingency: Yup.boolean().required(""),
  employee_profile_edition_rule: Yup.string().required(""),
  employee_role: Yup.object()
    .shape({
      id: Yup.string(),
      description: Yup.string(),
    })
    .nullable()
    .test("employee_role", "Selecione um cargo", (val: any) => !!val?.id),
  employee_plataform: Yup.object()
    .shape({
      id: Yup.string(),
      description: Yup.string(),
    })
    .nullable()
    .test(
      "employee_plataform",
      "Selecione uma plataforma",
      (val: any) => !!val?.id
    ),
  employee_costcenter: Yup.object()
    .shape({
      id: Yup.string(),
      description: Yup.string(),
    })
    .nullable()
    .test(
      "employee_costcenter",
      "Selecione um centro de custo",
      (val: any) => !!val?.id
    ),

  employee_type: Yup.object()
    .shape({
      id: Yup.string(),
      description: Yup.string(),
    })
    .nullable()
    .test(
      "employee_type",
      "Selecione um tipo de colaborador",
      (val: any) => !!val?.id
    ),
  employee_manager: Yup.object()
    .shape({
      id: Yup.string(),
      description: Yup.string(),
    })
    .nullable()
    .test("manager", "Please select a manager", (val: any) => !!val?.id),

  employee_company: Yup.object()
    .shape({
      id: Yup.string(),
      description: Yup.string(),
    })
    .nullable()
    .test("employee_company", "Selecione uma empresa", (val: any) => !!val?.id),
  employee_branch: Yup.object()
    .shape({
      id: Yup.string(),
      description: Yup.string(),
    })
    .nullable()
    .test("employee_branch", "Selecione uma filial", (val: any) => !!val?.id),
  employee: Yup.object()
    .shape({
      id: Yup.string(),
      description: Yup.string(),
      email: Yup.string(),
    })
    .nullable()
    .test("employee", "Selecione um colaborador", (val: any) => !!val?.id),
  updateEmployee: Yup.boolean(),
  // eslint-disable-next-line react/forbid-prop-types
  has_sap_job_positions: Yup.boolean().default(false),
  employee_sap_job_positions: Yup.array().optional().nullable(),
  employee_userid_login: Yup.string().optional().nullable(),
  employee_userid_sap: Yup.string().default("").optional(),
  employee_userid_sap_status: Yup.string().default("").optional(),
  employee_userid_sap_expiration_date: Yup.string().default("").optional(),

  employee_userid_as400: Yup.object()
    .shape({
      id: Yup.string(),
      description: Yup.string(),
    })
    .nullable()
    .optional(),
});

export const SAP_VALIDATION: Yup.SchemaOf<IRequestSAP> = Yup.object().shape({
  environment: test_select_object(
    "environment",
    "Please select a SAP environment"
  ).nullable(),
  service_type: test_select_object(
    "service_type",
    "Please select a service type"
  ).nullable(),
  user_type: test_select_object(
    "user_type",
    "Please select a user type"
  ).nullable(),
  user_id: test_select_object("user_id", "Please select a user id").nullable(),
  user_licence: Yup.string()
    .default("")
    .when(["environment", "user_type"], (environment, user_type) => {
      if (environment?.id === "ECC" && user_type.id === "S")
        return Yup.string()
          .required("Camo obrigatório")
          .test("user_licencse", "digite uma licença", (val: any) => {
            return val !== "";
          });
      return Yup.string().optional();
    }),
  is_job_position: Yup.boolean().default(false).optional(),
  profile_type: test_select_object("profile_type", "Defina o tipo de perfil"),
  job_position: default_object_shape.when(
    "profile_type",
    (profile_type: any) => {
      if (profile_type.id !== "1") {
        return default_object_shape.test(
          "usertype",
          "Please select the jobposition type",
          (val: any) => {
            return val ? !!val.id : false;
          }
        );
      }
      return default_object_shape.optional();
    }
  ),
  is_temporary: test_select_object(
    "is_temporary",
    "Campo Obrigatório"
  ).nullable(),

  profile_start_date: Yup.string()
    .default("")
    .when(
      ["service_type", "is_temporary"],
      (service_type: any, is_temporary: any) => {
        if (is_temporary?.id === "S" && service_type.id === "24") {
          console.log("testando");
          return Yup.string().test(
            "profile_start_date",
            "Please select the initial date",
            (val: any) => {
              console.log(val);
              if (val) return val !== "";
              return false;
            }
          );
        }
        return Yup.string().optional();
      }
    ),

  profile_end_date: Yup.mixed().when(
    ["service_type", "is_temporary"],
    (service_type: any, is_temporary: any) => {
      if (is_temporary?.id === "S" && service_type.id === "24") {
        return Yup.string().test(
          "profile_start_date",
          "Please select the initial date",
          (val: any) => {
            console.log(val);
            if (val) return val !== "";
            return false;
          }
        );
      }
      return Yup.string().optional();
    }
  ),
  profiles: Yup.array().notRequired(),
  profiles_table: Yup.array().notRequired(),
});

export const AS400_VALIDATION: Yup.SchemaOf<IRequestAS400> = Yup.object().shape(
  {
    environment: test_select_object(
      "environment",
      "Campo obrigatório"
    ).nullable(),
    service_type: test_select_object(
      "service_type",
      "Campo Obrigatório"
    ).nullable(),
    user_type: test_select_object("user_type", "Campo Obrigatório").nullable(),
    user_id: test_select_object("user_id", "Campo Obrigatório").nullable(),
    user_licence: Yup.string().default("").optional(),
    user_id_source: default_object_shape.when(
      "service_type",
      (service_type: any) => {
        if (service_type?.id === "193") {
          console.log("Validando");
          return test_select_object(
            "user_id_source",
            "Selecione um usuário base"
          );
        }
        return default_object_shape.optional();
      }
    ),
    is_job_position: test_select_object(
      "is_job_position",
      "Campo obrigatório"
    ).nullable(),
    job_position: default_object_shape.when(
      "is_job_position",
      (is_job_position: any) => {
        if (is_job_position.id === "S") {
          return default_object_shape.test(
            "usertype",
            "Selecione um perfil",
            (val: any) => {
              return val ? !!val.id : false;
            }
          );
        }
        return default_object_shape.optional();
      }
    ),
    system: default_object_shape.required(),
    routines: Yup.array().default([]).notRequired(),
    company: default_object_shape.optional(),
    branch: default_object_shape.optional(),
    region: default_object_shape.optional(),
    access: default_object_shape.optional(),
    table: Yup.array(
      Yup.object({
        id: Yup.number().default(0).optional(),
        service_type: Yup.string().default("").optional(),
        environment: Yup.string().default("").optional(),
        user_id: Yup.string().default("").optional(),
        system: Yup.string().default("").optional(),
        routine: Yup.string().default("").optional(),
        security_type: Yup.string().default("").optional(),
        security_company: Yup.string().default("").optional(),
        security_branchs: Yup.array().default([]).optional(),
        security_regions: Yup.array().default([]).optional(),
        security_text: Yup.string().default("").optional(),
        job_position: default_object_shape.optional(),
        access: Yup.string().default("").optional(),
        inc: Yup.boolean().default(false).optional(),
        exc: Yup.boolean().default(false).optional(),
        alt: Yup.boolean().default(false).optional(),
        con: Yup.boolean().default(false).optional(),
      })
    )
      .default([])
      .when("service_type", (service_type: any) => {
        if (service_type?.id === "06" || service_type?.id === "20") {
          return Yup.array().min(1, "Indique ao menos uma transação");
        }
        return Yup.array().optional();
      }),
  }
);

export const EMPLOYEE_FORM_VALIDATION = Yup.object().shape({
  request: EMPLOYEE_VALIDATION,
});

export const SAP_FORM_VALIDATION = Yup.object().shape({
  sap: SAP_VALIDATION,
});

export const AS400_FORM_VALIDATION = Yup.object().shape({
  as400: AS400_VALIDATION,
});
