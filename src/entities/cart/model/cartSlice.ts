import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem, CartState } from "./types"

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      )

      if (existingItem) {
        existingItem.quantity += action.payload.quantity
        existingItem.isAutoship = action.payload.isAutoship
        existingItem.autoshipDays = action.payload.autoshipDays
      } else {
        state.items.push(action.payload)
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
      }
    },

    updateCartItemAutoship: (
      state,
      action: PayloadAction<{
        id: string
        isAutoship: boolean
        autoshipDays: number
      }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.isAutoship = action.payload.isAutoship
        item.autoshipDays = action.payload.autoshipDays
      }
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  updateCartItemAutoship,
} = cartSlice.actions
export default cartSlice.reducer
