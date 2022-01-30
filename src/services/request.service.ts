/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IData } from "../pages/RequestStepForm/components/Interface";
import { IUserRequestCount } from "../utils/interfaces/home.interfaces";
import api from "./api";

class RequestService {
  async sendAS400Request(data: any): Promise<any> {
    const response = await api.post("/requests/as400", data);
    return response;
  }

  async sendSAPRequest(data: any): Promise<any> {
    const response = await api.post("/requests/sap", data);
    return response;
  }

  async getRequestList(): Promise<any> {
    const response = await api.get(`/requests`);
    const { data } = response;
    return data;
  }

  async getServicesCollection(id?: string): Promise<IData[]> {
    const data = [
      {
        id: "SAP",
        description: "SAP",
      },
      {
        id: "AS400",
        description: "AS400",
      },
      {
        id: "Desligamento",
        description: "Desligamento",
      },
      {
        id: "Outros",
        description: "Outros",
      },
    ];
    return data;
  }

  async getUserRequestsByUserId(
    userid: string,
    listtype: string
  ): Promise<any> {
    const response = await api.get(`/requests/user/${userid}/${listtype}`);
    const { data } = response;

    if (data) {
      console.log(data);
      const rows = data.map((entry: any, index: any) => {
        return {
          ...entry,
          id: entry.request_id,
          status: entry.status.status,
        };
      });
      return rows;
    }
    return null;
  }

  async getUserRequestCount(user: string): Promise<IUserRequestCount> {
    const response = await api.get(`/requests/count/${user}`);
    const { data } = response;
    return data;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  formatEmployeeData(data: any): any {
    return {
      id: data.request_id,
      request_by: data.requested_by_name,
      request_status: data.status.status,
      request_date: data.created_at,
      request_number: data.request_number,
      request_observation: data.request_observation,
      employee_role: {
        id: data.employee_role_id,
        description: data.employee_role_description,
      },
      employee_plataform: {
        id: data.employee_plataform_id,
        description: data.employee_plataform_description,
      },
      employee_costcenter: {
        id: data.employee_costcenter_id,
        description: data.employee_costcenter_description,
      },
      request_category: { id: "", description: "" },
      employee_type: {
        id: data.employee_type,
        description: data.employee_type_description,
      },
      employee_manager: {
        id: data.employe_manager_id,
        description: data.employee_manager_name,
      },
      employee_company: {
        id: data.employee_company_id,
        description: data.employee_company_description,
      },
      employee_branch: {
        id: data.employee_branch_id,
        description: data.employee_branch_description,
      },
      employee: {
        id: data.employee_id,
        description: data.employee_fullname,
        email: data.employee_email,
      },
      employee_userid_login: data.employee_login,
      employee_userid_as400: {
        id: data.employee_as400_id,
        description: data.employee_as400_id_description,
      },
      request_type: data.request_type,
    };
  }

  getCurrentResponsable(manager: string, value: any): string {
    const status = value.workflow ? value.workflow.status.id : -1;

    if (status !== -1) {
      console.log("");
      if (status === 0) return manager;
      if (status === 1)
        return value.license.users
          .map((user: any) => user.fullname)
          .join(" / ");
      if (status === 2)
        return value.ci.users.map((user: any) => user.fullname).join(" / ");
      if (status === 3)
        return value.cioilseeds.users
          .map((user: any) => user.fullname)
          .join(" / ");
      if (status === 4)
        return `${value?.lider?.fullname} / ${value?.lider_backup?.fullname}`;
      if (status === 5) return "N.A";
      if (status === 6)
        return value.executors.users.map((user: any) => user.fullname);
    }

    return "N.A";
  }

  async getRequestById(id: string): Promise<any> {
    const response = await api.get(`/requests/${id}`);
    const { data } = response;

    const obj = this.formatEmployeeData(data);

    const sap = data.saporderprofile
      ? data.saporderprofile.map((value: any) => {
          return {
            id: value.id,
            service_id: value.service_id,
            service_description: value.service_description,
            environment: value.environment,
            user_id: value.user_id,
            job_position:
              value.job_position === "" ? "Outros" : value.job_position,
            profile_name: value.profile_name,
            profile_description: value.profile_description,
            is_profile_temporary: value.is_profile_temporary,
            profile_expires_at: value.profile_expires_at,
            profile_valide_at: value.profile_valide_at,
            has_conflict: value.has_conflict,
            restricted_access: value.restricted_access,
            status: value.workflow ? value.workflow.status.status : "",
            responsable: this.getCurrentResponsable(
              data.employee_manager_name,
              value
            ),
          };
        })
      : null;

    const sapuser = data.saporderuser
      ? data.saporderuser.map((value: any) => {
          return {
            id: value.id,
            service_id: value.service_id,
            service_description: value.service_description,
            environment: value.environment,
            user_id: value.user_id,
            job_position: "",
            profile_name: "",
            profile_description: "",
            is_profile_temporary: "",
            profile_expires_at: "",
            profile_valide_at: "",
            has_conflict: false,
            restricted_access: false,
            status: value.workflow ? value.workflow.status.status : "",
            responsable: this.getCurrentResponsable(
              data.employee_manager_name,
              value
            ),
          };
        })
      : null;

    const as400 = data.as400orderprofile
      ? data.as400orderprofile.map((value: any) => {
          return {
            id: value.id,
            service_id: value.service_id,
            service_description: value.service_description,
            environment: value.environment,
            is_new_user: value.is_new_user,
            user_id: value.user_id,
            system: value.system,
            routine: value.routine,
            access_type: value.access_type,
            restricted_access: value.restricted_acces,
            limited_access: value.limited_access,
            company_id: value.company_id,
            branch_id: value.branch_id,
            branch_name: value.branch_name,
            region_id: value.region_id,
            region_name: value.region_name,
            access: value.access,
            access_observation: value.access_observation,
            job_position: value.job_position,
            status: value.workflow ? value.workflow.status.status : "",
            responsable: this.getCurrentResponsable(
              data.employee_manager_name,
              value
            ),
          };
        })
      : null;

    const as400user = data.as400orderuser
      ? data.as400orderuser.map((value: any) => {
          return {
            id: value.id,
            service_id: value.service_id,
            service_description: value.service_description,
            environment: value.environment,
            is_new_user: value.is_new_user,
            user_id: value.user_id,
            copy_user_id_status: value.copy_user_id_status,
            copy_user_id: value.copy_user_id,
            status: value.workflow ? value.workflow.status.status : "",
            responsable: this.getCurrentResponsable(
              data.employee_manager_name,
              value
            ),
          };
        })
      : null;

    const result = {
      ...obj,
      saptable: sap || sapuser ? [...sap, ...sapuser] : null,
      as400table: [...as400user, ...as400],
    };
    return result;
  }

  async getRequestWorkFlow(request_id: string): Promise<any> {
    const response = await api.get(`/requests/workflow/${request_id}`);
    const { data } = response;
    return data;
  }
}

export default new RequestService();
