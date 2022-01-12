import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { fetchRequestsByUser } from "../../services/data/RequestServices";

interface IProps {
  report: string;
  columns: GridColDef[];
}

export default function UserRequests({ report, columns }: IProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rows, setRows] = React.useState<any>();
  const { accountInfo } = useAuth();
  const [isCancelled, setIsCancelled] = React.useState<boolean>(false);
  const history = useHistory();

  const handleCellClick = (params: GridCellParams) => {
    const id = params.getValue(params.id, "id");
    history.push(`/request/${id}`);
    return "";
  };

  async function fetchData() {
    const rows = await fetchRequestsByUser(
      accountInfo?.user.displayName || "",
      report
    );
    if (!isCancelled) {
      setRows(rows);
    }
  }

  useEffect(() => {
    setIsCancelled(false);
    fetchData();

    return () => {
      setIsCancelled(true);
    };
  }, []);

  return (
    <div style={{ height: 650, width: "95%" }}>
      <DataGrid
        rows={rows || []}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[10, 20, 50, 100]}
        checkboxSelection={false}
        onCellDoubleClick={handleCellClick}
      />
    </div>
  );
}
