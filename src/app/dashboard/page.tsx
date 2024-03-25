"use client";
import { Box } from "@mui/material";
import Header from "./Header";
import Dashboard from "./Dashboard";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { getQuestionsAsync } from "@/lib/features/questions/questionsSlice";
import { useRouter } from "next/navigation";

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(getQuestionsAsync());
    } else {
      return router.push("/auth");
    }
  }, [dispatch, router]);
  
  return (
    <Box px={4}>
      <Header />
      <Dashboard />
    </Box>
  );
}
