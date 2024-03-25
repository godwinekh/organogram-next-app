import { Button, ButtonProps, styled } from "@mui/material";
import { purple, grey } from "@mui/material/colors";

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[700]),
  backgroundColor: purple[900],
  "&:hover": {
    backgroundColor: grey[900],
  },
}));

export default function PurpleBlackButton(props: ButtonProps) {
  return <StyledButton variant="contained" {...props} />;
}
