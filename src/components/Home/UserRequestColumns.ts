import { GridColDef } from "@mui/x-data-grid";

const draftColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    hide: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
  },
  {
    field: "employee_fullname",
    headerName: "Colaborador",
    width: 300,
  },

  {
    field: "employee_email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "employee_type_description",
    headerName: "Tipo colaborador",
    sortable: true,
    width: 120,
  },
  {
    field: "request_type",
    headerName: "Tipo Chamado",
    sortable: true,
    width: 150,
  },
  {
    field: "updated_at",
    headerName: "atualizado em",
    sortable: true,
    width: 200,
  },
];

const openColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    hide: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
  },
  {
    field: "request_number",
    headerName: "Número",
    width: 180,
  },
  {
    field: "employee_fullname",
    headerName: "Colaborador",
    width: 300,
  },
  {
    field: "employee_type_description",
    headerName: "Tipo colaborador",
    sortable: true,
    width: 120,
  },
  {
    field: "request_type",
    headerName: "Tipo Chamado",
    sortable: true,
    width: 150,
  },
  {
    field: "updated_at",
    headerName: "atualizado em",
    sortable: true,
    width: 200,
  },
];

const closedColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    hide: true,
  },
  {
    field: "request_status",
    headerName: "Status",
    width: 100,
  },
  {
    field: "request_number",
    headerName: "Número",
    width: 180,
  },
  {
    field: "employee_fullname",
    headerName: "Colaborador",
    width: 300,
  },
  {
    field: "employee_type_description",
    headerName: "Tipo colaborador",
    sortable: true,
    width: 120,
  },
  {
    field: "request_type",
    headerName: "Tipo Chamado",
    sortable: true,
    width: 150,
  },
  {
    field: "updated_at",
    headerName: "atualizado em",
    sortable: true,
    width: 200,
  },
];

export { draftColumns, openColumns, closedColumns };
