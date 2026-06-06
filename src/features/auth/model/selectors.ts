import type { RootState } from "@/app/store/store"

export const selectAuthModalIsOpen = (state: RootState) =>
  state.authModal.isOpen

export const selectAuthModalView = (state: RootState) => state.authModal.view
