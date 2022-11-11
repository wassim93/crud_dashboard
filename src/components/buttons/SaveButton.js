import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

export default function SaveButton({ text, backgroundColor, hoverBackgroundColor }) {
  return (
    <Button
      sx={{
        background: { backgroundColor },
        "&:hover": {
          background: { hoverBackgroundColor },
        },
      }}
      variant="contained"
    >
      {text}
    </Button>
  );
}

SaveButton.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
};

SaveButton.defaultProps = {
  backgroundColor: "#43C58A",
  hoverBackgroundColor: "#3AE6A2",
};
