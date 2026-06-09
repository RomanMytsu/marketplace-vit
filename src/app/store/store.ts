import { productApi } from "@/entities/products/api/productApi"
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/entities/auth/model/authSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
