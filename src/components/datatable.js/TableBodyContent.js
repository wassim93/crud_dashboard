import React from "react";
import PropTypes from "prop-types";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import TextCell from "./datatable-cells/TextCell";
import DateCell from "./datatable-cells/DateCell";
import ActionsCell from "./datatable-cells/ActionsCell";

function TableBodyContent({ cells, data, hasCheckbox, hasActions, handleActionClick }) {
  return (
    <>
      {data.map((row, index) => (
        <TableRow hover tabIndex={-1} key={index}>
          {hasCheckbox && (
            <TableCell padding="checkbox">
              {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} /> */}
              <Checkbox />
            </TableCell>
          )}
          {cells.map((cell) => (
            <>
              {cell.type === "text" && (
                <TableCell align="left">
                  <TextCell data={row[cell.dbName]} />
                </TableCell>
              )}
              {cell.type === "date" && (
                <TableCell align="left">
                  <DateCell data={row[cell.dbName]} />
                </TableCell>
              )}
            </>
          ))}
          {hasActions && (
            <TableCell align="right">
              <ActionsCell handleActionClick={handleActionClick} />
            </TableCell>
          )}
        </TableRow>
      ))}
    </>
  );
}

TableBodyContent.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.shape({})),
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default TableBodyContent;
