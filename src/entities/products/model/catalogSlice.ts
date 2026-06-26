import { createSlice } from "@reduxjs/toolkit"

interface CatalogState {
  mobileLimit: number
}

const initialState: CatalogState = {
  mobileLimit: 4,
}

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    incrementMobileLimit: (state) => {
      state.mobileLimit += 4
    },
    resetMobileLimit: (state) => {
      state.mobileLimit = 4
    },
  },
})

export const { incrementMobileLimit, resetMobileLimit } = catalogSlice.actions
export default catalogSlice.reducer
