"use client";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Header from "./Header";
import Dashboard from "./Dashboard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getQuestionsAsync } from "@/lib/features/questions/questionsSlice";
import { useRouter } from "next/navigation";
import NewQuestionModal from "./modals/NewQuestionModal";
import DetailsModal from "./modals/DetailsModal";
import Notification from "../global/Notification";
import { closeSnack } from "@/lib/features/ui/uiSlice";
import DeleteModal from "./modals/DeleteModal";

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"))
  const { open, type, message } = useAppSelector((state) => state.ui.snack);
  const token = localStorage.getItem("token");

  useEffect(() => {

    if (token) {
      dispatch(getQuestionsAsync());
    } else {
      return router.push("/auth");
    }
  }, [dispatch, token, router]);

  if (!token) {
    return <Box>
      <Typography>Redirecting user to sign in...</Typography>
    </Box>
  }

  return (
    <Box px={2}>
      <Header />
      <Dashboard />

      {/* Notifications Snack */}
      <Notification
        open={open}
        type={type}
        message={message}
        onClose={() => dispatch(closeSnack())}
      />

      {/* Modals */}
      <NewQuestionModal />
      {!isMediumUp && <DetailsModal />}
      <DeleteModal />
    </Box>
  );
}
