import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Page() {
  return (
    <Box>
      <Typography>Say Hello, to the New Project. Lets get started!</Typography>
      <Link href="/dashboard">Dashboard</Link>
    </Box>
  );
}
