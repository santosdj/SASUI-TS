import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridCellParams,
} from "@material-ui/data-grid";
import * as React from "react";

const requestColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "cargo",
    headerName: "Cargo",
    editable: false,
  },
  { field: "centrolucro", headerName: "Centro Lucro" },
  { field: "colaborador", headerName: "Colaborador" },
  { field: "cpf", headerName: "CPF" },
  { field: "data_sol", headerName: "Enviado em" },
  { field: "departamento", headerName: "Depto" },
  { field: "empresa", headerName: "Empresa" },
  { field: "filial", headerName: "Filial" },
  { field: "gerente_0", headerName: "Gestor" },
  { field: "nome", headerName: "Solicitante" },
  { field: "nomeempresa", headerName: "Empresa" },
  { field: "nomefilial", headerName: "Filial" },
  { field: "observacoes", headerName: "Obs" },
  { field: "plataforma", headerName: "Plataforma" },
  { field: "significadostatus", headerName: "Status" },
  { field: "solicnum", headerName: "Num" },
  { field: "tipochamado", headerName: "Tipo Chamado" },
  { field: "tipocolaborador", headerName: "TipoColaborador" },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export function DataGridDemo() {
  function handleDoubleClick(params: GridCellParams, event: React.MouseEvent) {
    alert("ha");
  }
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        // eslint-disable-next-line react/jsx-no-bind
        onCellDoubleClick={handleDoubleClick}
      />
    </div>
  );
}
