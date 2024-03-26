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
import Image from "next/image";
import Unauthorized from "@@/images/unauthorized.jpg";

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));
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
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={Unauthorized}
          alt="Authenticate User Image"
          width={240}
          height={240}
          quality={100}
          style={{ objectFit: "cover", zIndex: -1 }}
        />
        <Typography variant="overline" fontWeight="bold">
          Redirecting user to sign in...
        </Typography>
      </Box>
    );
  }

  return (
    <Box px={{ xs: 2, md: 4 }} bgcolor="whitesmoke" height="100vh">
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
