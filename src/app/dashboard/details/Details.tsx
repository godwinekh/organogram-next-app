import { Close, Delete, Description, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Icon,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import ItemDetail from "./ItemDetail";
import { useState } from "react";

export default function Details() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <Box
      sx={{
        border: ".5px solid whitesmoke",
        borderRadius: 1,
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 0.5,
          backgroundColor: "whitesmoke",
          padding: 2,
        }}
      >
        <Icon color="action">
          <Description fontSize="small" />
        </Icon>
        <Typography variant="overline" color="GrayText">
          Details
        </Typography>
      </Box>

      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography variant="h6">Title of Question</Typography>
          <Box sx={{ display: "flex" }}>
            <IconButton size="small" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <Close /> : <Edit />}
            </IconButton>

            <IconButton size="small" color="error">
              <Delete />
            </IconButton>
          </Box>
        </Box>

        <Divider />

        <ItemDetail onEdit={isEditing} />
      </Box>
    </Box>
  );
}
