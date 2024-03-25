import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1,
        mb: 2,
      }}
    >
      <Box>
        <Typography variant="h6" color="default" mb={1}>
          QuestionTime
        </Typography>
        <Button variant="contained" startIcon={<Add />} color="secondary">
          New
        </Button>
      </Box>

      <Box>
        <Typography variant="overline" color="GrayText">
          user
        </Typography>
        <Typography>Nelson Paul</Typography>
      </Box>
    </Box>
  );
}
