import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type AuthView = "login" | "register" | "recovery"

interface AuthModalState {
  isOpen: boolean
  view: AuthView
}

const initialState: AuthModalState = {
  isOpen: false,
  view: "login",
}

const authModalSlice = createSlice({
  name: "authModal",
  initialState,

  reducers: {
    openAuthModal(state, action: PayloadAction<AuthView>) {
      state.isOpen = true
      state.view = action.payload
    },
    closeAuthModal(state) {
      state.isOpen = false
    },
    setAuthView(state, action: PayloadAction<AuthView>) {
      state.view = action.payload
    },
  },
})

export const { openAuthModal, closeAuthModal, setAuthView } =
  authModalSlice.actions

export default authModalSlice.reducer
