import type { RootState } from "@/app/store/store"

export const selectSubscriptions = (state: RootState) =>
  state.subscription.items

