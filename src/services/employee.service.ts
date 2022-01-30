/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ICompany,
  IData,
  IEmployeeData,
  ISelectData,
} from "../pages/RequestStepForm/components/Interface";
import api from "./api";
import { sapService } from "./sap.service";

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

class EmployeeService {
  async getCompanyCollection(id?: string): Promise<ICompany[]> {
    const response = await api.get(`/employees/companies`);
    const { data } = response;
    return data;
  }

  async getCompanyOnlyCollection(id?: string): Promise<IData[]> {
    const response = await api.get(`/employees/companies`);
    const { data } = response;
    const x = data.map((value: any) => {
      return { id: value.id, description: value.description };
    });
    return x;
  }

  async getCompanyBranchCollection(id?: string): Promise<IData[]> {
    const response = await api.get(`/employees/companies`);
    const { data } = response;

    const company = data.filter((value: any) => value.id === id);
    if (company[0]) return company[0].branchs;
    return [{ id: "", description: "" }];
  }

  async getRoleCollection(id?: string): Promise<IData[]> {
    const response = await api.get(
      `/employees/roles?fieldoptions=S&orderby=description`
    );
    const { data } = response;
    return data;
  }

  async getPlataformCollection(id?: string): Promise<IData[]> {
    const response = await api.get(
      `/employees/plataforms?fieldoptions=S&orderby=description`
    );
    const { data } = response;
    return data;
  }

  async getCostCenterCollection(id?: string): Promise<IData[]> {
    const response = await api.get(
      `/employees/costcenters?fieldoptions=S&orderby=description`
    );
    const { data } = response;
    return data;
  }

  async getEmployeeTypeCollection(id?: string): Promise<IData[]> {
    const data = [
      {
        id: "Funcionário",
        description: "Funcionário",
      },
      {
        id: "Terceiro",
        description: "Terceiro",
      },
      {
        id: "Robô RCA",
        description: "Robô RCA",
      },
      {
        id: "Outros",
        description: "Outros",
      },
    ];
    return data;
  }

  async getEmployeeByNameCollection(name: string): Promise<IEmployeeData[]> {
    const response = await api.get(`/employees/name/${name}`);
    const { data } = response;

    const newdata = data.map((value: any) => {
      return {
        id: value.employee_id,
        description: value.employee_fullname,
        email: value.employee_email,
      };
    });

    return newdata;
  }

  async getManagerCollection(id?: string): Promise<IData[]> {
    const response = await api.get(
      `/employees/managers?fieldoptions=S&orderby=full_name`
    );
    const { data } = response;

    const mapeddata = data.map((value: any) => {
      return { id: value.id, description: value.full_name };
    });
    return mapeddata;
  }

  async getEmployeeById(id: string): Promise<IEmployeeData> {
    const response = await api.get(`/employees/${id}`);
    const { data } = response;
    return data;
  }

  setEmployeeNameOption(option: IEmployeeData): string {
    return option ? option.description : "";
  }

  setEmployeeHintNameOptions(option: IEmployeeData): string {
    if (option) return option ? `${option.description} ( ${option.email})` : "";
    return "";
  }

  setEmployeeEmailOption(option: IEmployeeData): string {
    if (option) return option.email ? option.email : "";
    return "";
  }

  setEmployeeHintEmailOptions(option: IEmployeeData): string {
    if (option) return option ? `${option.email} ( ${option.description})` : "";
    return "";
  }

  async getEmployeeValues(id: string): Promise<IEmployeeFormData> {
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

    const response = await api.get(`/employees/${id}`);
    const { data } = response;

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
        employee_userid_sap_expiration_date:
          data.employee_sap_id_expiration_date,
        employee_sap_job_positions: [],
        has_sap_job_positions: false,
      };

      console.log("procurando jobpositions");
      if (data.costCenter && data.manager) {
        const jobPositions: ISelectData[] =
          await sapService.getJobPositionCollection(
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
  }
}

export default new EmployeeService();
