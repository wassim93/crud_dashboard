import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import Iconify from "../../iconify";

function ActionsCell({ handleActionClick }) {
  return (
    <IconButton size="large" color="inherit" onClick={handleActionClick}>
      <Iconify icon={"eva:more-vertical-fill"} />
    </IconButton>
  );
}

ActionsCell.propTypes = {};

export default ActionsCell;
