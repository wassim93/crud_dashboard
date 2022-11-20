import React from "react";
import PropTypes from "prop-types";
import { Skeleton, TableCell, TableRow } from "@mui/material";

const TableRowLoader = ({ rowsNumber }) => {
  return (
    <>
      {Array.from({ length: rowsNumber }).map((_, index) => (
        <TableRow key={index}>
          <TableCell padding="none" colSpan={12} sx={{ paddingY: 0.8, paddingX: 0.8, borderBottom: "none" }}>
            <Skeleton variant="rect" height={100} animation="wave" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

TableRowLoader.propTypes = {
  rowsNumber: PropTypes.number,
};

export default TableRowLoader;
