import { auth, db } from "@/shared/firebase/firebase"
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export interface UserProfile {
  firstName: string
  lastName: string
  role: "regular" | "wholesale"
}

export const registerUser = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)

export const loginUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

export const recoverPassword = (email: string) =>
  sendPasswordResetEmail(auth, email)

export const createUserProfileInFirestore = (
  uid: string,
  profile: UserProfile,
) => {
  return setDoc(doc(db, "users", uid), profile)
}
