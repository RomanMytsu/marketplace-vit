import { db } from "@/shared/firebase/firebase"

export interface ProfileFormFields {
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zipCode: string
  email: string
  phoneNumber: string
}

export interface PaymentFormFields {
  cardNumber: string
  expiration: string
  cvc: string
}

export const saveProfileToFirebase = async (
  uid: string,
  profileData: ProfileFormFields,
): Promise<void> => {
  const { doc, setDoc } = await import("firebase/firestore")
  const docRef = doc(db, "users", uid)
  await setDoc(docRef, profileData, { merge: true })
}

export const savePaymentToFirebase = async (
  uid: string,
  paymentData: Omit<PaymentFormFields, "cvc">,
): Promise<void> => {
  const { doc, setDoc } = await import("firebase/firestore")
  const docRef = doc(db, "users", uid)
  await setDoc(docRef, { paymentMethod: paymentData }, { merge: true })
}
