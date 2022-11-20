import React from "react";
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
            Pas de données disponibles
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
};

NoDataAvailable.propTypes = {};

export default NoDataAvailable;
