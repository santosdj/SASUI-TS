import { IHeadCell, RequestType } from "../../hooks/useRequestTable";
import { useStyles } from "./useTableStyles";

export type Order = "asc" | "desc";

export interface IEnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof RequestType
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: IHeadCell[];
}

export type TableProps = {
  rows: RequestType[];
  headerData: IHeadCell[];
  title: string;
  tableType: string;
};
