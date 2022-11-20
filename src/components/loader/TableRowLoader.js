import React from "react";
import PropTypes from "prop-types";
import { Skeleton, TableCell, TableRow } from "@mui/material";

const TableRowLoader = ({ rowsNumber, cellsNumber }) => {
  return (
    <>
      {Array.from({ length: rowsNumber }).map((_, index) => (
        <TableRow key={index}>
          <TableCell padding="none" colSpan={cellsNumber} sx={{ paddingY: 0.6, paddingX: 0.6, borderBottom: "none" }}>
            <Skeleton variant="rect" height={80} animation="wave" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

TableRowLoader.propTypes = {
  rowsNumber: PropTypes.number,
  cellsNumber: PropTypes.number,
};

export default TableRowLoader;
