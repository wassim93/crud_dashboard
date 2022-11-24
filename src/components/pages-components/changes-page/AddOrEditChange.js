import React from "react";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import { Stack } from "@mui/material";
import TextfieldWrapper from "../../FormUI/Textfield";
import CancelButton from "../../buttons/CancelButton";
import ButtonWrapper from "../../FormUI/Buttons";
import DateTimePicker from "../../FormUI/DatePicker";

function AddOrEditChange({ initialValues, validationSchema, handleCancel }) {
  console.log(initialValues);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ ...initialValues }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        <Stack spacing={3} mx={2} my={2}>
          <TextfieldWrapper name="description" label="Description" multiline rows={6} value={initialValues.description} />
          <TextfieldWrapper name="team" label="Team" value={initialValues.team} />
          <TextfieldWrapper name="impact" label="Impact" />
          <DateTimePicker name="dateP" />

          <Stack direction="row" justifyContent="end" spacing={2}>
            <CancelButton text="Annuler" handleClick={handleCancel} />
            <ButtonWrapper sx={{ background: "#43C58A", "&:hover": { background: "#3AE6A2" } }}>Sauvegarder</ButtonWrapper>
          </Stack>
        </Stack>
      </Form>
    </Formik>
  );
}

AddOrEditChange.propTypes = {
  initialValues: PropTypes.shape({}),
  validationSchema: PropTypes.shape({}),
  handleCancel: PropTypes.func,
};

export default AddOrEditChange;
