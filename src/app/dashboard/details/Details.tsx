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
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openModal } from "@/lib/features/ui/uiSlice";
import { purple } from "@mui/material/colors";

export default function Details() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const activeQuestion = useAppSelector(
    (state) => state.questions.activeQuestion
  );
  const dispatch = useAppDispatch();

  const finishEditing = () => setIsEditing(false);

  return (
    <Box
      sx={{
        border: ".5px solid lightgrey",
        borderRadius: 1,
        overflowX: "hidden",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          backgroundColor: purple[900],
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 0.5,
          }}
        >
          <Icon color="action">
            <Description fontSize="small" sx={{ color: "white" }} />
          </Icon>
          <Typography variant="overline" color="white">
            Details
          </Typography>
        </Box>

        {activeQuestion.id && (
          <Box sx={{ display: "flex" }}>
            <IconButton
              size="small"
              sx={{ color: "white" }}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <Close fontSize="small" />
              ) : (
                <Edit fontSize="small" />
              )}
            </IconButton>

            <IconButton
              size="small"
              onClick={() => dispatch(openModal("delete"))}
              sx={{ color: "white" }}
            >
              <Delete />
            </IconButton>
          </Box>
        )}
      </Box>

      {!activeQuestion.id && (
        <Box
          height={300}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 5,
          }}
        >
          <Typography color="GrayText" textAlign="center">
            Select a question to preview, edit or delete.
          </Typography>
        </Box>
      )}

      {activeQuestion.id && (
        <Box>
          <Divider />

          <ItemDetail onEdit={isEditing} onSave={finishEditing} />
        </Box>
      )}
    </Box>
  );
}
