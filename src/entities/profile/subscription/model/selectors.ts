import type { RootState } from "@/app/store/store"

export const selectSubscriptions = (state: RootState) =>
  state.subscription.items
export const selectSubscriptionLoading = (state: RootState) =>
  state.subscription.isLoading
export const selectSubscriptionError = (state: RootState) =>
  state.subscription.error
