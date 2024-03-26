import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface NotificationProps {
  open: boolean;
  type: "success" | "error" | "info";
  message: string;
  onClose: () => void;
}

export default function Notification({
  open,
  type,
  message,
  onClose,
}: NotificationProps) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
        <Alert
          onClose={onClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
