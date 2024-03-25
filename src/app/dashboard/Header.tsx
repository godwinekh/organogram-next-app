import { Box, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import PurpleBlackButton from "../global/Button";

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
        <PurpleBlackButton startIcon={<Add />}>
          New
        </PurpleBlackButton>
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
