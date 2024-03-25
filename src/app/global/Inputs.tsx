import { Delete } from "@mui/icons-material";
import { Box, IconButton, InputLabel, TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface InputProps {
  index?: number;
  label?: string;
  value: string;
  fullWidth?: boolean;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => void;
}

export function CustomInput({ index, label, value, fullWidth, handleChange }: InputProps) {
  return (
    <Box>
      {label && (
        <InputLabel htmlFor={label} sx={{ textTransform: "capitalize" }}>
          {label}
        </InputLabel>
      )}
      <Box sx={{display: "flex", alignItems: "center"}}>
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

export function RegularInput() {}
