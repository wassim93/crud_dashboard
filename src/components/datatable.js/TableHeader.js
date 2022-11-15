import React from "react";
import PropTypes from "prop-types";

import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from "@mui/material";

function TableHeader({
  cells,
  hasCheckbox,
  hasActions,
  order,
  orderBy,
  rowCount,
  numSelected,
  onRequestSort,
  onSelectAllClick,
}) {
  const visuallyHidden = {
    border: 0,
    margin: -1,
    padding: 0,
    width: "1px",
    height: "1px",
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    clip: "rect(0 0 0 0)",
  };
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {hasCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}

        {cells.map((cell, index) => (
          <TableCell
            key={index}
            // align={headCell.alignRight ? "right" : "left"}
            sortDirection={orderBy === cell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon={false}
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : "asc"}
              onClick={createSortHandler(cell.id)}
            >
              {cell.label}
              {orderBy === cell.id ? <Box>{order === "desc" ? "sorted descending" : "sorted ascending"}</Box> : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {hasActions && <TableCell padding="checkbox">Action</TableCell>}
      </TableRow>
    </TableHead>
  );
}

TableHeader.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default TableHeader;
