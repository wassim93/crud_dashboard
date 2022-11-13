import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const InputText = ({ type, isRequired, label, isMultiline, rows, onInputChange, value, error, errorMsg }) => {
  return (
    <TextField
      type={type}
      // required={isRequired}
      id="outlined-basic"
      label={label}
      variant="outlined"
      multiline={isMultiline}
      rows={rows}
      onChange={onInputChange}
      value={value}
      error={error}
      helperText={errorMsg}
    />
  );
};

InputText.propTypes = {
  type: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string.isRequired,
  isMultiline: PropTypes.bool,
  rows: PropTypes.number,
  onInputChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
};
InputText.defaultProps = {
  isMultiline: false,
  isRequired: false,
  rows: 1,
  error: false,
  errorMsg: "",
};

export default InputText;
