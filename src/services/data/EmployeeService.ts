import {
  IData,
  IEmployeeData,
  ISelectData,
} from "../../pages/RequestStepForm/components/Interface";
import { getJobPositionCollection } from "./SAPRequestServices";

export interface IEmployeeFormData {
  is_contingency: boolean;
  employee_profile_edition_rule: string;
  employee_role: IData | undefined | null;
  employee_plataform: IData | undefined | null;
  employee_costcenter: IData | undefined | null;
  employee_type: IData | undefined | null;
  employee_manager: IData | undefined | null;
  employee_company: IData | undefined | null;
  employee_branch: IData | undefined | null;
  employee: IEmployeeData;
  updateEmployee: boolean;
  has_sap_job_positions: boolean;
  employee_sap_job_positions: ISelectData[];
  employee_userid_login?: string | undefined | null;
  employee_userid_as400: IData | undefined | null;
  employee_userid_sap: string | undefined | null;
  employee_userid_sap_status: string | undefined | null;
  employee_userid_sap_expiration_date: string | undefined | null;
}

const API_BASE_URL = process.env.REACT_APP_API_SAS_URL;

export const getEmployeeValues = async (
  id: string
): Promise<IEmployeeFormData> => {
  const employee_without_id = {
    is_contingency: false,
    employee_profile_edition_rule: "ALL",
    employee_role: null,
    employee_plataform: null,
    employee_costcenter: null,
    request_category: null,
    employee_type: null,
    employee_manager: null,
    employee_company: null,
    employee_branch: null,
    employee: { id: "", description: "", email: "" },
    updateEmployee: false,
    has_sap_job_positions: false,
    employee_sap_job_positions: [],
    employee_userid_login: "",
    employee_userid_as400: { id: "", description: "" },
    employee_userid_sap: "",
    employee_userid_sap_status: "",
    employee_userid_sap_expiration_date: "",
  };

  if (!id) return employee_without_id;

  const url = `${API_BASE_URL}/employees/${id}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();

  if (data) {
    const employee: IEmployeeFormData = {
      is_contingency: data.is_contingency,
      updateEmployee: false,
      employee: {
        id: data.employee_id,
        description: data.employee_fullname,
        email: data.employee_email,
      },
      employee_profile_edition_rule: data.employee_profile_edition_rule,
      employee_type: data.employee_type
        ? {
            id: data.employee_type,
            description: data.employee_type,
          }
        : null,
      employee_manager: data.manager
        ? {
            id: data.manager.id,
            description: data.manager.fullname,
          }
        : null,
      employee_role: data.role
        ? {
            id: data.role.id,
            description: data.role.description,
          }
        : null,
      employee_plataform: data.plataform
        ? {
            id: data.plataform.id,
            description: data.plataform.description,
          }
        : null,
      employee_costcenter: data.costCenter
        ? {
            id: data.costCenter.id,
            description: data.costCenter.description,
          }
        : null,
      employee_company: data.company
        ? {
            id: data.company.id,
            description: data.company.description,
          }
        : null,
      employee_branch: data.branch
        ? {
            id: data.branch.id,
            description: data.branch.description,
          }
        : null,

      employee_userid_login: data.employee_login,
      employee_userid_as400: data.as400User
        ? { id: data.as400User.id, description: data.as400User.user_name }
        : { id: "", description: "" },
      employee_userid_sap: data.employee_sap_id,
      employee_userid_sap_status: data.employee_sap_id_status,
      employee_userid_sap_expiration_date: data.employee_sap_id_expiration_date,
      employee_sap_job_positions: [],
      has_sap_job_positions: false,
    };

    console.log("procurando jobpositions");
    if (data.costCenter && data.manager) {
      const jobPositions: ISelectData[] = await getJobPositionCollection(
        data.manager.id,
        data.costCenter.id
      );
      console.log(`pegou jobpostions`);
      console.log(jobPositions);
      employee.employee_sap_job_positions = jobPositions;
      employee.has_sap_job_positions = !!jobPositions[0];
    }

    return employee;
  }

  return employee_without_id;
};
