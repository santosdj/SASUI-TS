export interface IData {
  id: string;
  description: string;
}
export interface ISelectData {
  id: string;
  description: string;
  email?: string;
}

export interface ICompany {
  id: string;
  description: string;
  branchs: IData[];
}

export interface IEmployeeData {
  id: string;
  description: string;
  email?: string;
}

export interface ISAPProfilesRow {
  id: number;
  environment: string;
  service_id: string;
  service_description: string;
  user_id: string;
  profile: string;
  profile_description: string;
  profile_type: string;
  job_position: string;
  is_temporary: boolean;
  profile_start_date: string;
  profile_end_date: string;
}

export interface IRequestSAP {
  environment: IData;
  service_type: IData;
  user_type: IData;
  user_id: IData;
  user_licence: string;
  is_job_position: boolean;
  job_position: IData;
  is_temporary: IData;
  profile_type: IData;
  profile_start_date: string;
  profile_end_date: string;
  profiles: IData[] | null | undefined;
  profiles_table: ISAPProfilesRow[] | null | undefined;
}

export interface IAS400RoutineData {
  id: string;
  description: string;
  system_id: string;
  access_type: string;
  access_observation: string;
  limited_access: boolean;
  restricted_access: boolean;
}

export interface IAS400TableRow {
  id: number;
  service_type: string;
  environment: string;
  user_id: string;
  system: string;
  routine: string;
  security_type: string;
  security_company: string;
  security_branchs: string[];
  security_regions: string[];
  security_text: string | null;
  job_position: string;
  access: string;
  inc: boolean;
  exc: boolean;
  alt: boolean;
  con: boolean;
}

export interface IRequestAS400 {
  environment: { id: string; description: string };
  service_type: { id: string; description: string };
  user_type: { id: string; description: string };
  user_id: { id: string; description: string };
  user_id_source: { id: string; description: string };
  user_licence: string;
  is_job_position: { id: string; description: string };
  job_position: { id: string; description: string };
  system: { id: string; description: string };
  routines: IAS400RoutineData[];
  company: { id: string; description: string };
  branch: { id: string; description: string };
  region: { id: string; description: string };
  access: { inc: boolean; exc: boolean; alt: boolean; con: boolean };
  table: IAS400TableRow[];
}
export interface IAS400Profile {
  profile: string;
  system_id: string;
  routine_id: string;
  routine_description: string;
  access_type: string;
  company: string;
  branch: string;
  region: string;
  inc: string;
  exc: string;
  alt: string;
  justification: string;
}

export interface IEmployee {
  id: string;
  request_by?: string;
  request_status?: string;
  request_date?: Date;
  request_number?: string;
  request_opentab: number;
  request_observation: string;
  is_contingency: boolean;
  employee_profile_edition_rule: string;
  employee_role: IData | undefined | null;
  employee_plataform: IData | undefined | null;
  employee_costcenter: IData | undefined | null;
  request_category: IData | undefined | null;
  employee_type: IData | undefined | null;
  employee_manager: IData | undefined | null;
  employee_company: IData | undefined | null;
  employee_branch: IData | undefined | null;
  employee: IEmployeeData;
  updateEmployee?: boolean;
  has_sap_job_positions: boolean;
  employee_sap_job_positions?: ISelectData[] | undefined | null;
  employee_userid_login?: string | undefined | null;
  employee_userid_as400: IData | undefined | null;
  employee_userid_sap: string | undefined | null;
  employee_userid_sap_status: string | undefined | null;
  employee_userid_sap_expiration_date: string | undefined | null;
}

export interface IRequestEmployee {
  request: IEmployee;
  sap: IRequestSAP;
  as400: IRequestAS400;
}
