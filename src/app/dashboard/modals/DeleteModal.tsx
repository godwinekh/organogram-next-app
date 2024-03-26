"use client";
import PurpleBlackButton from "@/app/global/Button";
import GenericModal from "@/app/global/Modal";
import { deleteQuestionAsync } from "@/lib/features/questions/questionsSlice";
import { closeModal } from "@/lib/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";

export default function DeleteModal() {
  const [deleteItem, setDeleteItem] = useState(false);
  const open = useAppSelector((state) => state.ui.modal.open);
  const activeQuestion = useAppSelector(
    (state) => state.questions.activeQuestion
  );
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(closeModal("delete"));

  if (deleteItem) {
    dispatch(deleteQuestionAsync(activeQuestion));
    handleClose();
    setDeleteItem(false);
  }

  return (
    <GenericModal
      open={open.delete}
      width={{ xs: 350, md: 400 }}
      height="auto"
      onClose={handleClose}
    >
      <Box>
        <Typography variant="h6" id="modal-title" padding={3}>
          Confirm Delete
        </Typography>
        <Divider />
        <Typography id="modal-description" padding={3}>
          Are you sure you want to delete this question?
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            pt: 2,
            pb: 5,
          }}
        >
          <PurpleBlackButton onClick={() => setDeleteItem(true)}>
            Yes
          </PurpleBlackButton>
          <PurpleBlackButton
            onClick={() => {
              handleClose();
              setDeleteItem(false);
            }}
          >
            No
          </PurpleBlackButton>
        </Box>
      </Box>
    </GenericModal>
  );
}
