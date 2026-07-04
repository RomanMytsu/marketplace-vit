import type { CartState } from "@/entities/cart/model/types"
import type { QuizState } from "@/features/Quiz/model/types"

const STORAGE_KEY = "marketplace_persistence_state"

interface ContractedState {
  quiz: QuizState
  cart: CartState
}

export const loadContractedState = (): ContractedState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)
    if (serializedState === null) return undefined
    const parsed = JSON.parse(serializedState)
    if (parsed && !parsed.cart) {
      parsed.cart = { items: [] }
    }

    return parsed
  } catch (error) {
    console.error("Could not load persistent state", error)
    return undefined
  }
}

export const saveContractedState = (state: ContractedState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serializedState)
  } catch (error) {
    console.error("Could not save persistent state", error)
  }
}
