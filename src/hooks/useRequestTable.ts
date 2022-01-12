export interface IHeadCell {
  disablePadding: boolean;
  id: keyof RequestType;
  label: string;
  numeric: boolean;
}
export type RequestType = {
  request_id: string;
  requested_by_id: string;
  requested_by_name: string;
  requested_by_email: string;
  request_number: string;
  request_status: string;
  request_type: string;
  request_copy_list: string;
  request_observation: string;
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
};

function setStatusTableHeader() {
  const header: IHeadCell[] = [
    {
      id: "request_status",
      numeric: false,
      disablePadding: true,
      label: "Status",
    },
    {
      id: "request_number",
      numeric: false,
      disablePadding: false,
      label: "Num",
    },
    {
      id: "employee_fullname",
      numeric: false,
      disablePadding: false,
      label: "Colaborador",
    },
    {
      id: "request_type",
      numeric: false,
      disablePadding: false,
      label: "Tipo",
    },
  ];
  return header;
}

function setNumberTableHeader() {
  const header: IHeadCell[] = [
    {
      id: "request_number",
      numeric: false,
      disablePadding: true,
      label: "Num",
    },
    {
      id: "request_status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "employee_fullname",
      numeric: false,
      disablePadding: false,
      label: "Colaborador",
    },
    {
      id: "request_type",
      numeric: false,
      disablePadding: false,
      label: "Tipo",
    },
  ];
  return header;
}

export function useRequestTable(headerType: string | "status"): {
  headCells: IHeadCell[];
} {
  let headCells: IHeadCell[] = [];
  headCells =
    headerType === "status" ? setStatusTableHeader() : setNumberTableHeader();

  return { headCells };
}
