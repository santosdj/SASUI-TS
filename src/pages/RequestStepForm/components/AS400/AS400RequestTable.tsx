import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";
import SecurityIcon from "@material-ui/icons/Security";
import VpnKey from "@material-ui/icons/VpnKey";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
  GridToolbarContainer,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { useFormikContext } from "formik";
import * as React from "react";

import Controls from "../../../../components/controlsformik/FormikControls";
import * as as400RequestServices from "../../../../services/data/AS400RequestServices";
import { IRequestEmployee } from "../Interface";

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any;
  removeProfile: (id: number[]) => void;
  updateProfile: (
    id: number[],
    company?: string,
    branchs?: string[],
    regions?: string[],
    access?: { inc: boolean; exc: boolean; alt: boolean; con: boolean }
  ) => void;
  addProfiles: (
    company: string,
    branchs: string[],
    regions: string[],
    access: { inc: boolean; exc: boolean; alt: boolean; con: boolean }
  ) => void;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 30 },
  { field: "service_type", headerName: "Serv.", width: 100 },
  {
    field: "environment",
    headerName: "Ambiente",
    width: 110,
  },
  { field: "user_id", headerName: "User ID", width: 130 },
  { field: "system", headerName: "Sistema", width: 130 },
  { field: "routine", headerName: "Rotina", width: 130 },
  { field: "security_type", headerName: "Tipo Seg.", width: 130 },
  {
    field: "company",
    headerName: "empresa",
    minWidth: 130,
    valueGetter: (params: GridValueGetterParams) => {
      const security_type = params.getValue(params.id, "security_type");
      if (security_type === "EF")
        return `${params.getValue(params.id, "security_company") || ""}`;
      return "--";
    },
  },
  {
    field: "branch",
    headerName: "Filial",
    minWidth: 130,
    valueGetter: (params: GridValueGetterParams) => {
      const security_type = params.getValue(params.id, "security_type");
      if (security_type === "EF")
        return `${params.getValue(params.id, "security_branchs") || ""}`;
      return "--";
    },
  },
  {
    field: "region",
    headerName: "Região",
    minWidth: 130,
    valueGetter: (params: GridValueGetterParams) => {
      const security_type = params.getValue(params.id, "security_type");
      if (security_type === "R")
        return `${params.getValue(params.id, "security_regions") || ""}`;

      return "--";
    },
  },

  { field: "access", headerName: "Acesso", width: 130 },
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

interface IToolBarProps {
  selectionModel: GridSelectionModel;
  removeProfile: (id: number[]) => void;
  updateProfile: (
    id: number[],
    company?: string,
    branchs?: string[],
    regions?: string[],
    access?: { inc: boolean; exc: boolean; alt: boolean; con: boolean }
  ) => void;
  addProfiles: (
    company: string,
    branchs: string[],
    regions: string[],
    access: { inc: boolean; exc: boolean; alt: boolean; con: boolean }
  ) => void;
}

function CustomToolbar(props: IToolBarProps) {
  const { selectionModel, removeProfile, updateProfile, addProfiles } = props;
  const { values, setFieldValue } = useFormikContext<IRequestEmployee>();

  const handleDeleteClick = () => {
    const ids = selectionModel.map((value) => parseInt(value.toString(), 10));
    removeProfile(ids);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkFieldNotNull = (field: any) => {
    if (!field) return false;
    if (field.id === "") return false;
    if (field === "") return false;
    return true;
  };

  const handleClick = (type = "Access") => {
    const ids = selectionModel.map((value) => parseInt(value.toString(), 10));
    const { company, branch, region, access } = values.as400;
    if (ids) {
      if (type === "Security") {
        if (
          checkFieldNotNull(company) &&
          checkFieldNotNull(branch) &&
          checkFieldNotNull(region)
        )
          updateProfile(ids, company.id, [branch.id], [region.id]);
        else {
          // eslint-disable-next-line no-alert
          window.alert("Informe a empresa, filial e região");
        }
      } else {
        updateProfile(ids, undefined, undefined, undefined, access);
      }
    }
  };

  const handleAddClick = () => {
    const { company, branch, region, access } = values.as400;
    if (
      checkFieldNotNull(company) &&
      checkFieldNotNull(branch) &&
      checkFieldNotNull(region)
    )
      addProfiles(company.id, [branch.id], [region.id], access);
    // eslint-disable-next-line no-alert
    else window.alert("Informe a empresa, filial e região");
  };

  React.useEffect(() => {
    console.log("mudou a empresa");
    setFieldValue("as400.branch", { id: "", description: "" });
  }, [values.as400.company]);

  return (
    <GridToolbarContainer>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Controls.InputSelect
                name="as400.company"
                label="Empresa"
                labelWithId
                getOptions={as400RequestServices.getCompanyOnlyCollection}
                editMode
              />
            </Grid>
            <Grid item xs={2}>
              <Controls.InputSelect
                label="Filial"
                name="as400.branch"
                labelWithId
                getOptions={as400RequestServices.getBranchOnlyCollection}
                optionsPrimaryKey={values.as400.company.id}
                editMode
              />
            </Grid>
            <Grid item xs={2}>
              <Controls.InputSelect
                name="as400.region"
                label="Região"
                labelWithId
                getOptions={as400RequestServices.getRegionCollection}
                editMode
              />
            </Grid>
            <Grid item sx={{ paddingLeft: "20px" }}>
              <Controls.CheckBoxAS400Access name="as400.access" />
              <Button
                onClick={() => {
                  handleAddClick();
                }}
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
              >
                Adicionar
              </Button>
              <Button
                onClick={() => {
                  handleClick("Security");
                }}
                variant="contained"
                startIcon={<SecurityIcon />}
              >
                Segurança
              </Button>
              <Button
                onClick={() => {
                  handleClick();
                }}
                variant="contained"
                startIcon={<VpnKey />}
              >
                Acesso
              </Button>
              <Button
                onClick={() => {
                  handleDeleteClick();
                }}
                variant="contained"
                startIcon={<DeleteIcon />}
              >
                Remover
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </GridToolbarContainer>
  );
}

export default function AS400RequestTable({
  rows,
  removeProfile,
  updateProfile,
  addProfiles,
}: IProps): JSX.Element {
  const currentlySelected = (params: GridCellParams) => {
    const value = params.colDef.field;
    if (value === "removeprofileaction") {
      const id = params.getValue(params.id, "id");
      if (id) {
        removeProfile([parseInt(id.toString(), 10)]);
      }
    }
    return "";
  };

  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  return (
    <div style={{ height: 450, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[5, 10, 30]}
        checkboxSelection
        onCellClick={currentlySelected}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          toolbar: {
            selectionModel,
            removeProfile,
            updateProfile,
            addProfiles,
          },
        }}
      />
    </div>
  );
}
