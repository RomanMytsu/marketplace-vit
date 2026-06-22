import type { ChangePasswordFields } from "@/entities/auth/model/types"
import { auth, db } from "@/shared/firebase/firebase"
export interface UserProfile {
  firstName: string
  lastName: string
  role: "regular" | "wholesale"
}

export const registerUser = async (email: string, password: string) => {
  const { createUserWithEmailAndPassword } = await import("firebase/auth")
  return createUserWithEmailAndPassword(auth, email, password)
}

export const loginUser = async (email: string, password: string) => {
  const { signInWithEmailAndPassword } = await import("firebase/auth")
  return signInWithEmailAndPassword(auth, email, password)
}

export const recoverPassword = async (email: string) => {
  const { sendPasswordResetEmail } = await import("firebase/auth")
  return sendPasswordResetEmail(auth, email)
}

export const logoutUser = async (): Promise<void> => {
  const { signOut } = await import("firebase/auth")
  return signOut(auth)
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
  const user = auth.currentUser

  if (!user || !user.email) {
    throw new Error("User session not found. Please re-login.")
  }

  const { EmailAuthProvider, reauthenticateWithCredential, updatePassword } =
    await import("firebase/auth")

  const credential = EmailAuthProvider.credential(
    user.email,
    data.currentPassword,
  )

  await reauthenticateWithCredential(user, credential)
  await updatePassword(user, data.newPassword)
}
