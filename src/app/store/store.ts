import { productApi } from "@/entities/products/api/productApi"
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/entities/auth/model/authSlice"
import quizReducer from "@/features/Quiz/model/quizSlice"
import subscriptionReducer from "@/entities/profile/model/subscriptionSlice"
import overviewReducer from "@/entities/profile/model/overviewSlice"
import paymentReducer from "@/entities/profile/model/paymentSlice"
import catalogReducer from "@/entities/products/model/catalogSlice"
import cartReducer from "@/entities/cart/model/cartSlice"
import {
  loadContractedState,
  saveContractedState,
} from "@/shared/lib/localStorage/persister"

const preloadedState = loadContractedState()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    subscription: subscriptionReducer,
    overview: overviewReducer,
    payment: paymentReducer,
    catalog: catalogReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productApi.middleware),
})

store.subscribe(() => {
  saveContractedState({
    quiz: store.getState().quiz,
    cart: store.getState().cart,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
