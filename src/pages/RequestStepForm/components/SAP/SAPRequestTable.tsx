import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import * as React from "react";

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any;
  removeProfile: (id: number) => void;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 30 },
  {
    field: "environment",
    headerName: "Ambiente",
    width: 90,
  },
  { field: "service_id", headerName: "Tipo Serviço", width: 130 },
  { field: "user_id", headerName: "User ID", width: 130 },

  {
    field: "profile_type",
    headerName: "Tipo Perfil",
    width: 90,
  },
  {
    field: "is_temporary",
    headerName: "Temporário",
    sortable: true,
    width: 30,
  },

  {
    field: "profile",
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
    field: "removeprofileaction",
    headerName: "",
    renderCell: () => {
      return (
        <Button variant="contained" color="error" startIcon={<DeleteIcon />} />
      );
    },
  },
];

export default function DataTable({
  rows,
  removeProfile,
}: IProps): JSX.Element {
  const currentlySelected = (params: GridCellParams) => {
    const value = params.colDef.field;
    if (value === "removeprofileaction") {
      const id = params.getValue(params.id, "id");
      if (id) {
        removeProfile(parseInt(id.toString(), 10));
      }
    }
    return "";
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[5, 10, 30]}
        checkboxSelection={false}
        onCellClick={currentlySelected}
      />
    </div>
  );
}
