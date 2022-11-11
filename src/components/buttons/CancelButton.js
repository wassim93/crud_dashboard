import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

export default function CancelButton({ text, variant, handleClick }) {
  return (
    <Button color="error" variant={variant} onClick={handleClick}>
      {text}
    </Button>
  );
}

CancelButton.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};
CancelButton.defaultProps = {
  variant: "outlined",
};
