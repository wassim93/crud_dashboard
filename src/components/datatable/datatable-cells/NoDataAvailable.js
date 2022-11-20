import React from "react";
import PropTypes from "prop-types";
import { Paper, TableCell, TableRow, Typography } from "@mui/material";

const NoDataAvailable = () => {
  return (
    <TableRow>
      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color={"error"}>
            No data available
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
};

NoDataAvailable.propTypes = {};

export default NoDataAvailable;
