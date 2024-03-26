import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Severity = "success" | "error" | "info";
type ModalOpen = "details" | "question" | "delete";

interface Modal {
  open: {
    details: boolean;
    question: boolean;
    delete: boolean;
  };
}

interface Snack {
  open: boolean;
  type: Severity;
  message: string;
}

interface UIState {
  modal: Modal;
  snack: Snack;
}

const initialState: UIState = {
  modal: {
    open: {
      details: false,
      question: false,
      delete: false,
    },
  },
  snack: {
    open: false,
    type: "success",
    message: "",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalOpen>) {
      switch (action.payload) {
        case "details":
          state.modal.open.details = true;
          break;
        case "question":
          state.modal.open.question = true;
          break;
        default:
          state.modal.open.delete = true;
          break;
      }
    },
    closeModal(state, action: PayloadAction<ModalOpen>) {
      switch (action.payload) {
        case "details":
          state.modal.open.details = false;
          break;
        case "question":
          state.modal.open.question = false;
          break;
        default:
          state.modal.open.delete = false;
          break;
      }
    },
    openSnack(
      state,
      action: PayloadAction<{ type: Severity; message: string }>
    ) {
      state.snack.open = true;
      state.snack.type = action.payload.type;
      state.snack.message = action.payload.message;
    },
    closeSnack(state) {
      state.snack.open = initialState.snack.open;
      state.snack.message = initialState.snack.message;
    },
  },
});

export const { openModal, closeModal, openSnack, closeSnack } = uiSlice.actions;

export default uiSlice.reducer;
