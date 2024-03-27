import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { CustomInput } from "../../global/Inputs";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateActiveQuestion } from "@/lib/features/questions/questionsSlice";

interface Question {
  question: string;
  options: string[];
}

interface ItemProps {
  onEdit: boolean;
  onSave: () => void;
}

const defaultQuestion: Question = {
  question: "How are you today?",
  options: ["You are goood", "I am good", "We are good", "Always good"],
};

export default function ItemDetail({ onEdit: isEditing, onSave }: ItemProps) {
  const activeQuestion = useAppSelector(
    (state) => state.questions.activeQuestion
  );
  const [editedQuestion, setEditedQuestion] = useState<Question>({
    question: "",
    options: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  let canSave: boolean = false;

  if (isEditing && editedQuestion.question !== activeQuestion.question) {
    canSave = true;
  } else {
    for (const option of editedQuestion.options) {
      if (activeQuestion.options.includes(option)) {
        canSave = false;
      } else {
        canSave = true;
        break;
      }
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    if (index) {
      console.log(index);
      setEditedQuestion((prev) => {
        const newOptions = [...prev.options];
        newOptions[index - 1] = e.target.value;
        return {
          question: prev.question,
          options: newOptions,
        };
      });
    } else {
      console.log(index);
      setEditedQuestion((prev) => ({ ...prev, question: e.target.value }));
    }
  };

  const handleSave = () => {
    const updatedActiveQuestion = {
      id: activeQuestion.id,
      ...editedQuestion,
    };

    dispatch(updateActiveQuestion(updatedActiveQuestion));
    onSave();
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

  useEffect(() => {
    const { id, ...initialEditState } = activeQuestion;

    if (isEditing) {
      setEditedQuestion(initialEditState);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isEditing, activeQuestion]);

  return (
    <Box padding={3} sx={{ maxHeight: { md: 400 }, overflowY: "scroll" }}>
      {/* Show a loading state between editing and not editing */}
      {isEditing && isLoading && (
        <Box>
          <CircularProgress
            variant="indeterminate"
            size="2rem"
            color="secondary"
          />
        </Box>
      )}

      <Box mb={3}>
        {isEditing && !isLoading && (
          <Fragment>
            <InputLabel htmlFor="question">Question</InputLabel>

            <CustomInput
              value={editedQuestion.question}
              handleChange={handleChange}
            />
          </Fragment>
        )}

        {!isEditing && (
          <Typography variant="body1">{activeQuestion.question}</Typography>
        )}
      </Box>

      <Box mb={2}>
        {isEditing &&
          !isLoading &&
          editedQuestion.options.map((option, index) => (
            <Box key={index} mb={1}>
              <CustomInput
                label={`Options ${index + 1}`}
                index={index + 1}
                value={option}
                handleChange={handleChange}
              />
            </Box>
          ))}

        {!isEditing &&
          activeQuestion.options.map((option, index) => (
            <Box key={index} mb={1}>
              <Typography variant="subtitle2" color="GrayText">
                Option {index + 1}
              </Typography>
              <Typography variant="body1">{option}</Typography>
            </Box>
          ))}
      </Box>
      {isEditing && (
        <Button
          variant="contained"
          color="secondary"
          disabled={!canSave ? true : false}
          onClick={handleSave}
        >
          Save
        </Button>
      )}
    </Box>
  );
}
