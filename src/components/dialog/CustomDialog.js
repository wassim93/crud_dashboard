import { Dialog, DialogTitle } from "@mui/material";
import React from "react";

export default function CustomDialog({ open, handleClose, title, children }) {
  return (
    <Dialog
      scroll={"paper"}
      PaperProps={{ sx: { width: "600px", maxHeight: 600 } }}
      open={open}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      {children}
    </Dialog>
  );
}
