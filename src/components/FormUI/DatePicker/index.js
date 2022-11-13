import React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DateTimePicker = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: "date",
    variant: "outlined",
    // fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    <TextField {...configDateTimePicker} />
    // </LocalizationProvider>
  );
};

export default DateTimePicker;
