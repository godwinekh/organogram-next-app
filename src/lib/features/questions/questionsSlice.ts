import { createSlice } from "@reduxjs/toolkit";

interface Question {
  question: string;
  options: string[];
}

interface Questions {
  [prop: string]: Question;
}

const initialState: Questions = {};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    getQuestions() {},
    updateQuestion() {},
    deleteQuestion() {},
  },
});

export const { getQuestions, updateQuestion, deleteQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;
