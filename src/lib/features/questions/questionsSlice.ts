import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { openSnack } from "../ui/uiSlice";

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
  changes: {
    count: number;
    ids: string[];
  };
  allQuestions: Questions;
  activeQuestion: ActiveQuestion;
  deletedQuestions: Questions;
}

export const getQuestionsAsync = () => async (dispatch: any) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("https://qt.organogram.app/questions", {
      method: "GET",
      headers: {
        Token: token!,
      },
    });
    const data: Questions = await res.json();
    dispatch(getQuestions({ ...data }));
  } catch (error) {
    dispatch(
      openSnack({
        type: "error",
        message:
          "Something is stopping me from getting your questions!",
      })
    );
    // console.log("Error fetching questions:", error);
  }
};

export const addQuestionAsync =
  (question: Question) => async (dispatch: any) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://qt.organogram.app/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: token!,
        },
        body: JSON.stringify({ ...question }),
      });
      const responseId = await res.json();
      dispatch(getQuestions({ [responseId]: question }));
      dispatch(
        openSnack({
          type: "success",
          message: "Nice one champ! Question created successfully.",
        })
      );
    } catch (error) {
      dispatch(
        openSnack({
          type: "error",
          message:
            "file not saved!",
        })
      );
      // console.log("Error adding question:", error);
    }
  };

export const syncUpdatedQuestions =
  (questions: Questions, ids: string[]) => async (dispatch: any) => {
    try {
      const token = localStorage.getItem("token");

      for (const id of ids) {
        const res = await fetch(`https://qt.organogram.app/questions/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Token: token!,
          },
          body: JSON.stringify({ ...questions[id] }),
        });
      }

      dispatch(
        openSnack({
          type: "success",
          message: "Wheew! Your changes are secure now. Rest easy champ!",
        })
      );
      dispatch(clearChanges());
    } catch (error) {
      dispatch(openSnack({type: "error", message: "Whoops! Couldn't sync updated questions. Try again"}))
      // console.log("Error syncing updated questions:", error);
    }
  };

export const deleteQuestionAsync =
  (question: ActiveQuestion) => async (dispatch: any) => {
    try {
      const token = localStorage.getItem("token");
      const { id, ...questionObj } = question;
      const res = await fetch(`https://qt.organogram.app/questions/${id}`, {
        method: "DELETE",
        headers: {
          Token: token!,
        },
      });
      dispatch(clearActiveQuestion());
      dispatch(deleteQuestion(id));
      dispatch(
        openSnack({
          type: "success",
          message:
            "You made me sad! Question deleted",
        })
      );
    } catch (error) {
      dispatch(openSnack({type: "error", message: "Hmm! Your question refuses to go. Want to keep it or try deleting it again?"}))
      // console.log("Error deleting question:", error);
    }
  };

const initialState: QuestionsState = {
  changes: {
    count: 0,
    ids: [],
  },
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
      state.allQuestions = { ...state.allQuestions, ...action.payload };
    },
    getActiveQuestion(state, action: PayloadAction<string>) {
      const questions = state.allQuestions;
      const key = action.payload;
      const selected = {
        id: key,
        ...questions[key],
      };

      // Update state
      state.activeQuestion = selected;
    },
    clearActiveQuestion(state) {
      state.activeQuestion = initialState.activeQuestion;
    },
    updateActiveQuestion(state, action: PayloadAction<ActiveQuestion>) {
      state.activeQuestion = action.payload;
      const { id, ...question } = action.payload;

      // Check if the id is not already in the ids array before pushing
      if (!state.changes.ids.includes(id)) {
        state.changes.ids.push(id);
        state.changes.count += 1;
        // update the active question in allquestions state
        state.allQuestions[id] = question;
      } else {
        // If id is already in the ids array, just update the state
        state.allQuestions[id] = question;
      }
    },
    clearChanges(state) {
      state.changes = initialState.changes;
    },
    deleteQuestion(state, action: PayloadAction<string>) {
      const deletedKey = action.payload;
      const deletedQuestion = state.allQuestions[deletedKey];

      // delete the question node from state.
      delete state.allQuestions[deletedKey];
      // add the question to the deleted state
      state.deletedQuestions = {...state.deletedQuestions, deletedKey: deletedQuestion}
    },
  },
});

export const {
  getQuestions,
  getActiveQuestion,
  clearActiveQuestion,
  updateActiveQuestion,
  clearChanges,
  deleteQuestion,
} = questionsSlice.actions;

export default questionsSlice.reducer;
