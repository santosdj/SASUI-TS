import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any;
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

  { field: "system", headerName: "Sis.", width: 80 },
  { field: "routine", headerName: "rotina.", width: 80 },
  { field: "access_type", headerName: "Seg", width: 60 },
  { field: "company_id", headerName: "Empresa", width: 100 },
  { field: "branch_id", headerName: "Filial.", width: 120 },
  { field: "region_id", headerName: "Região.", width: 120 },
  { field: "access", headerName: "Acesso", width: 120 },
  {
    field: "responsable",
    headerName: "Responsável(eis)",
    sortable: true,
    width: 200,
  },
];

export default function AS400Table({ rows }: IProps): JSX.Element {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={30}
        rowsPerPageOptions={[5, 10, 30]}
        checkboxSelection
      />
    </div>
  );
}
