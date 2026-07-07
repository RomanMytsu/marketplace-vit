import type { ProfileFormFields } from "@/entities/profile/api/profileApi"

export interface CheckoutFormFields extends ProfileFormFields {
  cardNumber: string
  expiration: string
  cvc: string
}

export const checkoutInitialValues: CheckoutFormFields = {
  firstName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "NY",
  zipCode: "",
  email: "",
  phoneNumber: "",
  cardNumber: "",
  expiration: "",
  cvc: "",
}
