import GenericModal from "@/app/global/Modal";
import Details from "../details/Details";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { closeModal } from "@/lib/features/ui/uiSlice";
import { Box } from "@mui/material";
import PurpleBlackButton from "@/app/global/Button";

export default function DetailsModal() {
  const open = useAppSelector((state) => state.ui.modal.open);
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(closeModal("details"));

  return (
    <GenericModal open={open.details} onClose={handleClose}>
      <Details />

      <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <PurpleBlackButton onClick={handleClose}>Close</PurpleBlackButton>
      </Box>
    </GenericModal>
  );
}
