import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { CustomInput } from "../../global/Inputs";
import { useAppSelector } from "@/lib/hooks";

interface Question {
  question: string;
  options: string[];
}

const defaultQuestion: Question = {
  question: "How are you today?",
  options: ["You are goood", "I am good", "We are good", "Always good"],
};

export default function ItemDetail({ onEdit: isEditing }: { onEdit: boolean }) {
  const activeQuestion = useAppSelector(
    (state) => state.questions.activeQuestion
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    // if (index) {
    //   setQuestion((prev) => {
    //     const newOptions = [...prev.options];
    //     newOptions[index] = e.target.value;
    //     return {
    //       question: prev.question,
    //       options: newOptions,
    //     };
    //   });
    // } else {
    //   setQuestion((prev) => ({ ...prev, question: e.target.value }));
    // }
  };

  const handleDeleteOption = (index: number) => {
    // if (question.options.length > 3) {
    //   setQuestion((item) => {
    //     const filteredOptions = item.options.filter((option, idx) => idx === index);
    //     return {
    //       ...item,
    //     }
    //   })
    // }
  };

  return (
    <Box padding={2} sx={{ maxHeight: 330, overflowY: "scroll" }}>
      <Box mb={3}>
        <InputLabel htmlFor="question">Question</InputLabel>
        {isEditing ? (
          <CustomInput
            value={activeQuestion.question}
            handleChange={handleChange}
          />
        ) : (
          <Typography variant="body1">{activeQuestion.question}</Typography>
        )}
      </Box>

      <Box mb={2}>
        {/* <Typography variant="subtitle1">Options</Typography> */}
        {activeQuestion.options.map((option, index) => (
          <Box key={index} mb={1}>
            {isEditing ? (
              <CustomInput
                label={`Options ${index + 1}`}
                index={index}
                value={option}
                handleChange={handleChange}
              />
            ) : (
              <Box>
                <Typography variant="subtitle2" color="GrayText">
                  Option {index + 1}
                </Typography>
                <Typography variant="body1">{option}</Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      {isEditing && (
        <Button variant="contained" color="secondary" onClick={() => {}}>
          Save
        </Button>
      )}
    </Box>
  );
}
