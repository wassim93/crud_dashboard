import React from "react";
import PropTypes from "prop-types";
import { Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from "@mui/material";

function TableHeader({ cells, hasCheckbox, hasActions, sortDirection, sortAction, sortBy, onSelectAllClick }) {
  return (
    <TableHead>
      <TableRow>
        {hasCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox onChange={onSelectAllClick} />
          </TableCell>
        )}

        {cells.map((cell, index) => (
          <TableCell key={index} sortDirection={sortDirection}>
            <TableSortLabel active={true} direction={sortBy === cell.dbName ? sortDirection : "desc"} onClick={() => sortAction(cell.dbName)}>
              {cell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        {hasActions && <TableCell padding="normal">Actions</TableCell>}
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
  onSelectAllClick: PropTypes.func,
};

export default TableHeader;
