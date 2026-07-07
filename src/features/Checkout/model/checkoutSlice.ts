import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createOrderInFirebase } from "../api/checkoutApi"
import { clearCart } from "@/entities/cart/model/cartSlice"
import type { CheckoutFormFields } from "./checkoutTypes"
import type { RootState } from "@/app/store/store"
import { selectUser } from "@/entities/auth/model/selectors"

const SHIPPING_PRICE = 9.2

export const placeOrder = createAsyncThunk<
  string,
  CheckoutFormFields,
  { rejectValue: string; state: RootState }
>(
  "checkout/placeOrder",
  async (formValues, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
    const user = selectUser(state)
    const cartItems = state.cart.items

    if (!user) {
      return rejectWithValue("You must be logged in to place an order.")
    }

    if (cartItems.length === 0) {
      return rejectWithValue("Your cart is empty.")
    }

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )
    const totalDiscount = cartItems.reduce((sum, item) => {
      if (item.oldPrice && item.oldPrice > item.price) {
        return sum + (item.oldPrice - item.price) * item.quantity
      }
      return sum
    }, 0)
    const todayTotal = subtotal + SHIPPING_PRICE

    try {
      const orderId = await createOrderInFirebase({
        userId: user.uid,
        deliveryAndBilling: formValues,
        items: cartItems,
        pricing: {
          subtotal,
          discount: totalDiscount,
          shipping: SHIPPING_PRICE,
          total: todayTotal,
        },
      })

      dispatch(clearCart())

      return orderId
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue("An unexpected error occurred.")
    }
  },
)

interface CheckoutState {
  isLoading: boolean
  error: string | null
  successOrderId: string | null
}

const initialState: CheckoutState = {
  isLoading: false,
  error: null,
  successOrderId: null,
}

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    resetCheckoutState: (state) => {
      state.isLoading = false
      state.error = null
      state.successOrderId = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.successOrderId = null
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.successOrderId = action.payload
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? "Failed to place order"
      })
  },
})

export const { resetCheckoutState } = checkoutSlice.actions

export const selectCheckoutLoading = (state: RootState) =>
  state.checkout.isLoading
export const selectCheckoutError = (state: RootState) => state.checkout.error
export const selectSuccessOrderId = (state: RootState) =>
  state.checkout.successOrderId

export default checkoutSlice.reducer
