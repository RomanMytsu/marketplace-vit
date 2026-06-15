import { createSelector } from "@reduxjs/toolkit"
import { QUIZ_STEPS } from "../config/quizSteps"
import type { RootState } from "@/app/store/store"

export const selectQuizState = (state: RootState) => state.quiz

export const selectCurrentStepIdx = (state: RootState) =>
  selectQuizState(state).currentStep

export const selectQuizAnswers = (state: RootState) =>
  selectQuizState(state).answers

export const selectAnswerById = (state: RootState, questionId: string) =>
  selectQuizAnswers(state)[questionId]

export const selectStringAnswerById = (
  state: RootState,
  questionId: string,
): string | undefined => {
  const answer = selectQuizAnswers(state)[questionId]
  return typeof answer === "string" ? answer : undefined
}

export const selectCurrentStepConfig = createSelector(
  [selectCurrentStepIdx],
  (currentStepIdx) => QUIZ_STEPS[currentStepIdx] || null,
)

export const selectIsLastStep = createSelector(
  [selectCurrentStepIdx],
  (currentStepIdx) => currentStepIdx === QUIZ_STEPS.length - 1,
)

export const selectTotalSteps = () => QUIZ_STEPS.length

export const selectUserName = (state: RootState): string | undefined =>
  selectStringAnswerById(state, "name")
