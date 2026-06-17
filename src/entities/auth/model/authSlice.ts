import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthUserData {
  uid: string
  email: string | null
}
interface AuthState {
  user: AuthUserData | null
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUserData | null>) {
      state.user = action.payload
      state.isLoading = false
    },
  },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer
