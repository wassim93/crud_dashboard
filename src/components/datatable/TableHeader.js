import React from "react";
import PropTypes from "prop-types";

import { Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from "@mui/material";

function TableHeader({ cells, hasCheckbox, hasActions, sortDirection, sortAction, sortBy, isChecked, rowCount, numSelected, onSelectAllClick }) {
  return (
    <TableHead>
      <TableRow>
        {hasCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              // indeterminate={numSelected > 0 && numSelected < rowCount}
              // checked={isChecked}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}

        {cells.map((cell, index) => (
          <TableCell key={index} sortDirection={sortDirection}>
            <TableSortLabel
              active={cell.sortable}
              direction={sortBy === cell.dbName ? sortDirection : "desc"}
              onClick={() => sortAction(cell.dbName)}
            >
              {cell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        {hasActions && <TableCell padding="checkbox">Action</TableCell>}
      </TableRow>
    </TableHead>
  );
}

TableHeader.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.shape({})),
  hasCheckbox: PropTypes.bool,
  hasActions: PropTypes.bool,
  sortAction: PropTypes.func,
  sortDirection: PropTypes.oneOf(["asc", "desc"]),
  sortBy: PropTypes.string,
  // rowCount: PropTypes.number,
  // headLabel: PropTypes.array,
  // numSelected: PropTypes.number,
  // onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default TableHeader;
