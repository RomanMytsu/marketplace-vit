import { changePasswordInFirebase } from "@/features/auth/api/authApi"
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ChangePasswordFields } from "./types"

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

export const changeUserPassword = createAsyncThunk<
  void,
  ChangePasswordFields,
  { rejectValue: string }
>(
  "auth/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      await changePasswordInFirebase({ currentPassword, newPassword })
    } catch (error) {
      if (error instanceof Error) {
        const firebaseError = error as { code?: string }
        if (
          firebaseError.code === "auth/wrong-password" ||
          firebaseError.code === "auth/invalid-credential"
        ) {
          return rejectWithValue("Incorrect current password.")
        }
        return rejectWithValue(error.message)
      }
      return rejectWithValue("An unexpected error occurred.")
    }
  },
)

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
