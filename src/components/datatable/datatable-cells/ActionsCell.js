import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import Iconify from "../../iconify";

function ActionsCell({ handleActionClick, row }) {
  return (
    <IconButton size="large" color="inherit" onClick={(event) => handleActionClick(row, event)}>
      <Iconify icon={"eva:more-vertical-fill"} />
    </IconButton>
  );
}

ActionsCell.propTypes = {
  handleActionClick: PropTypes.func,
  row: PropTypes.shape({}),
};

export default ActionsCell;
