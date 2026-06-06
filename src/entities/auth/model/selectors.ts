import type { RootState } from "@/app/store/store"

export const selectUser = (state: RootState) => state.auth.user
export const selectAuthLoading = (state: RootState) => state.auth.isLoading
