import React from 'react';
import { RequestType } from '../../hooks/useRequestTable';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom';

export type TableProps = {
  rows: RequestType[];
  title: string;
};

export default function UserDraft({ rows, title }: TableProps) {
  const history = useHistory();
  const [selected, setSelected] = React.useState<string[]>([]);
  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleOpenRequestClick = (
    event: React.MouseEvent<unknown>,
    requestId: string
  ) => {
    history.push(`/request/open/${requestId}`);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const tableRow = (
    row: RequestType,
    isItemSelected: boolean,
    labelId: string
  ) => {
    return (
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
        onClick={(event) => handleOpenRequestClick(event, row.id)}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
            onClick={(event) => {
              event.stopPropagation();
              handleClick(event, row.id);
            }}
          />
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.colaborador}
        </TableCell>
        <TableCell>{row.cpf}</TableCell>
        <TableCell>{row.tipocolaborador}</TableCell>
        <TableCell>{row.tipochamado}</TableCell>
      </TableRow>
    );
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Colaborador</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Tipo Colaborador</TableCell>
              <TableCell>Tipo Chamado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;
              return tableRow(row, isItemSelected, labelId);
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
