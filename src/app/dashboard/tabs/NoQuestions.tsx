import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Tabs } from "../Dashboard";
import PurpleBlackButton from "@/app/global/Button";

export default function NoQuestions(props: { tab: Tabs }) {
  let message: string;

  switch (props.tab) {
    case "questions":
      message = "Create a new question to begin";
      break;
    case "shared":
      message = "Share a question with others";
      break;
    default:
      message = "Delete a question to view trashed items";
      break;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        py: 15,
      }}
    >
      <Typography textAlign="center">No questions found. {message}!</Typography>

      <PurpleBlackButton  startIcon={<Add />} size="large">
        New
      </PurpleBlackButton>
    </Box>
  );
}
