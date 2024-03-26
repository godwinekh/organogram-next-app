"use client";
import GenericModal from "@/app/global/Modal";
import {
  Box,
  Divider,
  IconButton,
  InputLabel,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";

// Import your Yup schema
import schema from "./newQuestionSchema";
import { FormInput } from "@/app/global/Inputs";
import PurpleBlackButton from "@/app/global/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CloseOutlined } from "@mui/icons-material";
import { closeModal } from "@/lib/features/ui/uiSlice";
import { addQuestionAsync } from "@/lib/features/questions/questionsSlice";

export default function NewQuestionModal() {
  const open = useAppSelector((state) => state.ui.modal.open);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      question: "",
      options: ["", "", ""],
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addQuestionAsync(values));
      resetForm();
      // console.log(values);
    },
  });

  const handleCloseModal = () => dispatch(closeModal("question"));

  return (
    <GenericModal open={open.question} onClose={handleCloseModal}>
      <Box
        padding={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h5">Create a new question</Typography>
          <Typography variant="button"></Typography>
        </Box>
        <IconButton onClick={handleCloseModal}>
          <CloseOutlined />
        </IconButton>
      </Box>

      <Divider />

      <Box component="form" onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 2,
            padding: 4,
          }}
        >
          <Box flexBasis="45%">
            <InputLabel htmlFor="question">Enter Your Question</InputLabel>
            <FormInput
              name="question"
              multiline={true}
              value={formik.values.question}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={!!(formik.touched.question && formik.errors.question)}
              errorMessage={formik.errors.question}
              fullWidth={true}
            />
          </Box>

          <Box flexBasis="55%">
            <InputLabel>Options (Min: 3, Max: 5)</InputLabel>
            {formik.values.options.map((option, index) => (
              <FormInput
                key={index}
                name={`options.${index}`}
                multiline={false}
                fullWidth={true}
                value={formik.values.options[index]}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                error={
                  !!(
                    formik.touched.options &&
                    formik.errors.options &&
                    formik.errors.options[index]
                  )
                }
                errorMessage={
                  formik.errors.options && formik.errors.options[index]
                }
              />
            ))}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 2,
              }}
            >
              <PurpleBlackButton
                type="button"
                size="small"
                disabled={formik.values.options.length === 5}
                onClick={() =>
                  formik.setFieldValue(`options`, [
                    ...formik.values.options,
                    "",
                  ])
                }
              >
                Add Option
              </PurpleBlackButton>
              <PurpleBlackButton
                type="button"
                size="small"
                disabled={formik.values.options.length <= 3}
                onClick={() =>
                  formik.setFieldValue(
                    `options`,
                    formik.values.options.slice(0, -1)
                  )
                }
              >
                Remove Option
              </PurpleBlackButton>
            </Box>
          </Box>
        </Box>
        <Box padding={3}>
          <PurpleBlackButton type="submit" size="large">
            Save Question
          </PurpleBlackButton>
        </Box>
      </Box>
    </GenericModal>
  );
}
