import { useStyles } from './useTableStyles';
import {
  HeadCell,
  RequestType,
} from '../../hooks/useRequestTable';

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
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
  headCells: HeadCell[];
}

export type TableProps = {
  rows: RequestType[];
  headerData: HeadCell[];
  title: string;
  tableType: string;
};

