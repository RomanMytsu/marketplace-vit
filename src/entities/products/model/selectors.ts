import type { RootState } from "@/app/store/store"

export const selectMobileLimit = (state: RootState) => state.catalog.mobileLimit
