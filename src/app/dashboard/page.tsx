import { Box } from "@mui/material";
import Header from "./Header";
import Dashboard from "./Dashboard";

export default function Page() {
  return (
    <Box px={4}>
      <Header />
      <Dashboard />
    </Box>
  );
}
