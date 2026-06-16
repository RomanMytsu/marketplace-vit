import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchProfileSubscriptions, updateSubscriptionStatusInFirebase } from "../api/subscriptionApi"
import type { FirestoreSubscription } from "./types"

interface SubscriptionState {
  items: FirestoreSubscription[]
  isLoading: boolean
  error: string | null
}

const initialState: SubscriptionState = {
  items: [],
  isLoading: false,
  error: null,
}

export const getSubscriptions = createAsyncThunk<FirestoreSubscription[], void>(
  "subscription/getSubscriptions",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProfileSubscriptions()
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred",
      )
    }
  },
)

export const cancelSubscription = createAsyncThunk<string, string>(
  "subscription/cancelSubscription",
  async (id, { rejectWithValue }) => {
    try {
      await updateSubscriptionStatusInFirebase(id, "cancelled")
      return id
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to cancel subscription",
      )
    }
  },
)

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptions.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getSubscriptions.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(getSubscriptions.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
      })
      .addCase(cancelSubscription.rejected, (_, action) => {
        // Здесь можно обработать ошибку, например, показать toast уведомление
        console.error("Redux error canceling subscription:", action.payload)
      })
  },
})

export default subscriptionSlice.reducer
