import { Delete } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FocusEvent, ReactNode } from "react";

interface InputProps {
  value: string;
  fullWidth?: boolean;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => void;
}

interface CustomInputProps extends InputProps {
  index?: number;
  label?: string;
}

interface FormInputProps extends InputProps {
  name: string;
  multiline: boolean;
  error: boolean;
  errorMessage?: string;
  handleBlur: (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export function CustomInput({
  index,
  label,
  value,
  fullWidth,
  handleChange,
}: CustomInputProps) {
  return (
    <Box>
      {label && (
        <InputLabel htmlFor={label} sx={{ textTransform: "capitalize" }}>
          {label}
        </InputLabel>
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          id={label}
          variant="outlined"
          size="small"
          margin="dense"
          value={value}
          onChange={(event) => handleChange(event, index)}
          multiline
          maxRows={4}
          fullWidth={fullWidth}
        />
        {label && (
          <IconButton size="small">
            <Delete fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export function FormInput({
  name,
  value,
  error,
  errorMessage,
  handleChange,
  handleBlur,
  fullWidth,
  multiline,
}: FormInputProps) {
  return (
    <Box mb={2}>
      <TextField
        id={name}
        name={name}
        value={value}
        size="small"
        onChange={handleChange}
        onBlur={handleBlur}
        multiline={multiline}
        fullWidth={fullWidth}
        rows={4}
      />
      {error ? (
        <Typography variant="subtitle2" color="error">
          {errorMessage}
        </Typography>
      ) : (
        ""
      )}
    </Box>
  );
}
