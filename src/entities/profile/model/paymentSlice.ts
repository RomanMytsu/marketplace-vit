import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  savePaymentToFirebase,
  type PaymentFormFields,
} from "../api/profileApi"

export type SavePaymentFields = Omit<PaymentFormFields, "cvc">

interface PaymentState {
  isSaving: boolean
  error: string | null
}

const initialState: PaymentState = {
  isSaving: false,
  error: null,
}

export const savePaymentInfo = createAsyncThunk<
  SavePaymentFields,
  { uid: string; fields: SavePaymentFields },
  { rejectValue: string }
>("profile/savePaymentInfo", async ({ uid, fields }, { rejectWithValue }) => {
  try {
    await savePaymentToFirebase(uid, fields)
    return fields
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to save payment info",
    )
  }
})

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(savePaymentInfo.pending, (state) => {
        state.isSaving = true
        state.error = null
      })
      .addCase(savePaymentInfo.fulfilled, (state) => {
        state.isSaving = false
      })
      .addCase(savePaymentInfo.rejected, (state, action) => {
        state.isSaving = false
        state.error = action.payload ?? "An unexpected error occurred"
      })
  },
})

export default paymentSlice.reducer
