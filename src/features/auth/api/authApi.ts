import type { ChangePasswordFields } from "@/entities/auth/model/types"
import { db } from "@/shared/firebase/firebase"
export interface UserProfile {
  firstName: string
  lastName: string
  role: "regular" | "wholesale"
}

export const registerUser = async (email: string, password: string) => {
  const { createUserWithEmailAndPassword, getAuth } =
    await import("firebase/auth")
  const { app } = await import("@/shared/firebase/firebase")
  return createUserWithEmailAndPassword(getAuth(app), email, password)
}

export const loginUser = async (email: string, password: string) => {
  const { signInWithEmailAndPassword, getAuth } = await import("firebase/auth")
  const { app } = await import("@/shared/firebase/firebase")
  return signInWithEmailAndPassword(getAuth(app), email, password)
}

export const recoverPassword = async (email: string) => {
  const { sendPasswordResetEmail, getAuth } = await import("firebase/auth")
  const { app } = await import("@/shared/firebase/firebase")
  return sendPasswordResetEmail(getAuth(app), email)
}

export const logoutUser = async (): Promise<void> => {
  const { signOut, getAuth } = await import("firebase/auth")
  const { app } = await import("@/shared/firebase/firebase")
  return signOut(getAuth(app))
}

export const createUserProfileInFirestore = async (
  uid: string,
  profile: UserProfile,
) => {
  const { doc, setDoc } = await import("firebase/firestore")
  return setDoc(doc(db, "users", uid), profile)
}

export const changePasswordInFirebase = async (
  data: Omit<ChangePasswordFields, "confirmPassword">,
): Promise<void> => {
  const {
    getAuth,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
  } = await import("firebase/auth")
  const { app } = await import("@/shared/firebase/firebase")

  const auth = getAuth(app)
  const user = auth.currentUser

  if (!user || !user.email) {
    throw new Error("User session not found. Please re-login.")
  }

  const credential = EmailAuthProvider.credential(
    user.email,
    data.currentPassword,
  )

  await reauthenticateWithCredential(user, credential)
  await updatePassword(user, data.newPassword)
}
