"use client";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { CustomInput } from "../global/Inputs";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { openSnack } from "@/lib/features/ui/uiSlice";
import Image from "next/image";
import AuthBg from "@@/images/auth-bg.jpg";
import { AccountBox } from "@mui/icons-material";

interface ReturnDataObject {
  token: string;
}

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.target.value);
  };

  const handleSignIn = async () => {
    setIsLoading(true)
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
      setIsLoading(false)
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
        position: "relative",
        backgroundColor: "#00000095",
      }}
    >
      {/* Background Image */}
      <Box>
        <Image
          src={AuthBg}
          alt="Neon background"
          fill
          quality={100}
          style={{ objectFit: "cover", zIndex: -1 }}
        />
      </Box>
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
          <TextField
            variant="outlined"
            size="small"
            margin="dense"
            value={email}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBox fontSize="large" sx={{ color: "black" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleSignIn}
          >
            {!loading && "Sign in"}
            {loading && <CircularProgress variant="indeterminate" color="inherit" size="1rem" sx={{color: "white"}} />}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
