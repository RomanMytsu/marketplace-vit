import { db } from "@/shared/firebase/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import type { CheckoutFormFields } from "../model/checkoutTypes"
import type { CartItem } from "@/entities/cart/model/types"

interface CreateOrderParams {
  userId: string
  deliveryAndBilling: CheckoutFormFields
  items: CartItem[]
  pricing: {
    subtotal: number
    discount: number
    shipping: number
    total: number
  }
}

type SafeBillingFields = Omit<
  CheckoutFormFields,
  "cardNumber" | "expiration" | "cvc"
> &
  Partial<Pick<CheckoutFormFields, "cardNumber" | "expiration" | "cvc">>

export const createOrderInFirebase = async (
  orderData: CreateOrderParams,
): Promise<string> => {
  try {
    const ordersRef = collection(db, "orders")

    const { deliveryAndBilling, ...restOrderData } = orderData

    const safeAddressData: SafeBillingFields = { ...deliveryAndBilling }

    delete safeAddressData.cardNumber
    delete safeAddressData.expiration
    delete safeAddressData.cvc

    const docRef = await addDoc(ordersRef, {
      ...restOrderData,
      deliveryAndBilling: safeAddressData,
      createdAt: serverTimestamp(),
      status: "processing",
    })

    return docRef.id
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Firebase Order Error: ${error.message}`, {
        cause: error,
      })
    }
    throw new Error("Failed to save order in Firebase", { cause: error })
  }
}
