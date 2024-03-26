import { Add } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Tabs } from "../Dashboard";
import PurpleBlackButton from "@/app/global/Button";
import { useAppDispatch } from "@/lib/hooks";
import { openModal } from "@/lib/features/ui/uiSlice";

export default function NoQuestions(props: { tab: Tabs }) {
  const dispatch = useAppDispatch();
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

      {props.tab === "questions" && (
        <PurpleBlackButton
          onClick={() => dispatch(openModal("question"))}
          startIcon={<Add />}
          size="large"
        >
          New
        </PurpleBlackButton>
      )}
    </Box>
  );
}
