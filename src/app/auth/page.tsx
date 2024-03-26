"use client";
import { Box, Button, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { CustomInput } from "../global/Inputs";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { openSnack } from "@/lib/features/ui/uiSlice";

interface ReturnDataObject {
  token: string;
}

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.target.value);
  };

  const handleSignIn = async () => {
    try {
      const res = await fetch("https://qt.organogram.app/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data: ReturnDataObject = await res.json();
      // Stores the token and email in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);
      // Redirects the user to the dashboard
      router.push("/dashboard");
      dispatch(
        openSnack({
          type: "success",
          message: "Sign in successful! Good to have you here.",
        })
      );
      console.log(data);
    } catch (error) {
      dispatch(
        openSnack({
          type: "error",
          message: "Error signing you in. Do try again",
        })
      );
      // console.log("Error fetching data:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "whitesmoke",
      }}
    >
      <Box
        width={{ xs: "90%", sm: "65%", md: "40%" }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          py: 4,
          borderRadius: 4,
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            QT Sign In
          </Typography>
          <Typography variant="subtitle2">
            Enter your email to continue
          </Typography>
        </Box>

        <Box width="80%" py={1}>
          <CustomInput
            value={email}
            handleChange={handleChange}
            fullWidth={true}
          />
        </Box>

        <Box>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
