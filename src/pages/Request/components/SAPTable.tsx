import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NewType = any;

interface IProps {
  rows: NewType;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 30, hide: true },
  {
    field: "status",
    headerName: "Status",
    width: 90,
  },
  {
    field: "environment",
    headerName: "Ambiente",
    width: 90,
  },
  { field: "service_id", headerName: "Cód.", width: 60 },
  { field: "service_description", headerName: "Serviço", width: 180 },
  { field: "user_id", headerName: "User ID", width: 130 },

  {
    field: "job_position",
    headerName: "Tipo Perfil",
    width: 120,
  },
  {
    field: "profile_name",
    headerName: "Perfil",
    sortable: true,
    width: 400,
  },
  {
    field: "profile_description",
    headerName: "Descrição",
    sortable: true,
    width: 400,
  },
  {
    field: "responsable",
    headerName: "Responsável(eis)",
    sortable: true,
    width: 200,
  },
];

export default function SAPTable({ rows }: IProps): JSX.Element {
  console.log(rows);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={30}
        rowsPerPageOptions={[5, 10, 30]}
        checkboxSelection={false}
      />
    </div>
  );
}
