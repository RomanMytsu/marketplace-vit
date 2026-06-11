import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { QuizState } from "./types"

const initialState: QuizState = {
  userName: "",
  currentStep: 0,
  answers: {},
}

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload
      state.answers["name"] = action.payload
    },
    setAnswer(
      state,
      action: PayloadAction<{ questionId: string; value: string | string[] }>,
    ) {
      state.answers[action.payload.questionId] = action.payload.value
    },
    nextStep(state) {
      state.currentStep += 1
    },
    prevStep(state) {
      if (state.currentStep > 0) state.currentStep -= 1
    },
    resetQuiz(state) {
      state.userName = ""
      state.currentStep = 0
      state.answers = {}
    },
  },
})

export const { setUserName, setAnswer, nextStep, prevStep, resetQuiz } =
  quizSlice.actions
export default quizSlice.reducer
