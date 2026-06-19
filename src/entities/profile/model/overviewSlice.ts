import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  saveProfileToFirebase,
  type ProfileFormFields,
} from "../api/profileApi"

interface ProfileState {
  isSaving: boolean
  error: string | null
}

const initialState: ProfileState = {
  isSaving: false,
  error: null,
}

export const saveOverviewInfo = createAsyncThunk<
  ProfileFormFields,
  { uid: string; fields: ProfileFormFields },
  { rejectValue: string }
>("profile/saveProfileInfo", async ({ uid, fields }, { rejectWithValue }) => {
  try {
    await saveProfileToFirebase(uid, fields)
    return fields
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to save profile info",
    )
  }
})

const overviewSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveOverviewInfo.pending, (state) => {
        state.isSaving = true
        state.error = null
      })
      .addCase(saveOverviewInfo.fulfilled, (state) => {
        state.isSaving = false
      })
      .addCase(saveOverviewInfo.rejected, (state, action) => {
        state.isSaving = false
        state.error = action.payload ?? "An unexpected error occurred"
      })
  },
})

export default overviewSlice.reducer
