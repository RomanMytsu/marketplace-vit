import type { QuizState } from "@/features/Quiz/model/types"

const STORAGE_KEY = "quiz_persistence_state"

export const loadContractedState = (): { quiz: QuizState } | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (error) {
    console.error("Could not load quiz state", error)
    return undefined
  }
}

export const saveContractedState = (state: { quiz: QuizState }) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serializedState)
  } catch (error) {
    console.error("Could not save quiz state", error)
  }
}
