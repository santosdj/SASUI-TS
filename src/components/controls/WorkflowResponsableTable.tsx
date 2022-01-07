import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

import { INewStep } from "./WorkFlowSteps";

interface IProps {
  rows: INewStep;
}

export default function WorkflowResponsableTable({
  rows,
}: IProps): JSX.Element {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Grupo</TableCell>
            <TableCell align="right">Responsáveis</TableCell>
            <TableCell align="right">Pendentes</TableCell>
            <TableCell align="right">Analisados</TableCell>
            <TableCell align="right">Analisado por</TableCell>
            <TableCell align="right">Analisado em</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.responsables.map((row, index) => (
            <TableRow
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.group}</TableCell>
              <TableCell align="right">{row.users.join(" / ")}</TableCell>
              <TableCell align="right">{row.doingCount}</TableCell>
              <TableCell align="right">{row.doneCount}</TableCell>
              <TableCell align="right">{row.doneBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
