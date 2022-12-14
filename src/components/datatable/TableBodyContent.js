import React from "react";
import PropTypes from "prop-types";
import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";
import TextCell from "./datatable-cells/TextCell";
import DateCell from "./datatable-cells/DateCell";
import ActionsCell from "./datatable-cells/ActionsCell";
import TableRowLoader from "../loader/TableRowLoader";
import { isEmpty } from "lodash";
import NoDataAvailable from "./datatable-cells/NoDataAvailable";

function TableBodyContent({ cells, data, isLoading, hasCheckbox, updateSelectedAction, selectedRows, hasActions, handleActionClick }) {
  return (
    <TableBody>
      {(isLoading && <TableRowLoader rowsNumber={5} cellsNumber={cells.length + 2} />) || (
        <>
          {(isEmpty(data) && <NoDataAvailable />) || (
            <>
              {data.map((row, index) => (
                <TableRow hover key={index}>
                  {hasCheckbox && (
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedRows.includes(row)} onChange={() => updateSelectedAction(row)} />
                    </TableCell>
                  )}
                  {cells.map((cell, index) => (
                    <React.Fragment key={cell.type + "_" + index}>
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
                      {cell.type === "component" && (
                        <TableCell>
                          <cell.component data={row[cell.dbName]} />
                        </TableCell>
                      )}
                    </React.Fragment>
                  ))}
                  {hasActions && (
                    <TableCell align="inherit">
                      <ActionsCell handleActionClick={handleActionClick} row={row} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </>
          )}
        </>
      )}
    </TableBody>
  );
}

TableBodyContent.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.shape({})),
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default TableBodyContent;
