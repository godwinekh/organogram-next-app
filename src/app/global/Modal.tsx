import { ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

interface GenericModalProps {
  open: boolean;
  width?: string | number | { [prop: string]: number | string };
  height?: string | number | { [prop: string]: number | string };
  onClose: () => void;
  children: ReactNode;
}

export default function GenericModal({
  open,
  onClose,
  width,
  height,
  children,
}: GenericModalProps) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: ".5px solid lightgrey",
    outline: 0,
    borderRadius: ".5rem",
    overflow: "hidden",
    backgroundColor: "background.paper",
    boxShadow: 24,
    width: width ? width : { xs: "100%", md: "60%" },
    height: height ? height : { xs: "100vh", md: "auto" },
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="title"
      aria-describedby="description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}
