import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

export type QuestionAnswersState = {
  answers?: QuestionAnswers;
};

const initialState: QuestionAnswersState = {};
const questionAnswersSlice = createSlice({
  name: "questionAnswers",
  initialState,
  reducers: {
    setQuestionAnswers: (state, action: PayloadAction<QuestionAnswers>) => {
      state.answers = action.payload;
    },
  },
});

export const { setQuestionAnswers } = questionAnswersSlice.actions;

export const getQuestionAnswers = (state: QuestionAnswersState) =>
  state.answers;

export default questionAnswersSlice.reducer;
