import { Badge, Box, Typography } from "@mui/material";
import { Add, CloudSync, ExitToApp } from "@mui/icons-material";
import PurpleBlackButton from "../global/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openModal } from "@/lib/features/ui/uiSlice";
import { syncUpdatedQuestions } from "@/lib/features/questions/questionsSlice";
import { useRouter } from "next/navigation";

export default function Header() {
  const dispatch = useAppDispatch();
  const { count, ids } = useAppSelector((state) => state.questions.changes);
  const allQuestions = useAppSelector((state) => state.questions.allQuestions);
  const router = useRouter();
  const userEmail = localStorage.getItem("email");

  const signOut = () => {
    localStorage.clear();
    router.push("/auth");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        py: 1,
        mb: 4,
      }}
    >
      <Box>
        <Typography variant="h6" color="default" mb={1}>
          QuestionTime
        </Typography>
        <PurpleBlackButton
          startIcon={<Add />}
          onClick={() => dispatch(openModal("question"))}
        >
          New
        </PurpleBlackButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
        <Badge
          badgeContent={count}
          color="warning"
          invisible={!count ? true : false}
        >
          <PurpleBlackButton
            startIcon={<CloudSync />}
            disabled={!count ? true : false}
            onClick={() => dispatch(syncUpdatedQuestions(allQuestions, ids))}
          >
            Sync changes
          </PurpleBlackButton>
        </Badge>

        <PurpleBlackButton onClick={signOut}>
          <ExitToApp />
        </PurpleBlackButton>
      </Box>
    </Box>
  );
}
