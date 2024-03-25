import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
  question: string;
  options: string[];
}

interface ActiveQuestion extends Question {
  id: string;
}

interface Questions {
  [prop: string]: Question;
}

interface QuestionsState {
  allQuestions: Questions;
  activeQuestion: ActiveQuestion;
  deletedQuestions: Questions;
}

export const getQuestionsAsync = () => async (dispatch: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch("https://qt.organogram.app/questions", {
    method: "GET",
    headers: {
      Token: token!,
    },
  });
  const data: Questions = await res.json();
  console.log(token, data);
  dispatch(getQuestions({ ...data }));
};

const initialState: QuestionsState = {
  allQuestions: {},
  activeQuestion: {
    id: "",
    question: "",
    options: [],
  },
  deletedQuestions: {},
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    getQuestions(state, action: PayloadAction<Questions>) {
      state.allQuestions = action.payload;
    },
    updateQuestion() {},
    deleteQuestion() {},
  },
});

export const { getQuestions, updateQuestion, deleteQuestion } =
  questionsSlice.actions;

export default questionsSlice.reducer;
