import { db } from "@/shared/firebase/firebase"
import type { FirestoreSubscription } from "../model/types"

export const fetchProfileSubscriptions = async (): Promise<
  FirestoreSubscription[]
> => {
  const { collection, getDocs } = await import("firebase/firestore")

  const querySnapshot = await getDocs(collection(db, "profile-subscriptions"))
  return querySnapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
  })) as FirestoreSubscription[]
}

export const updateSubscriptionStatusInFirebase = async (
  id: string,
  status: "cancelled",
): Promise<void> => {
  const { doc, updateDoc } = await import("firebase/firestore")
  const docRef = doc(db, "profile-subscriptions", id)
  await updateDoc(docRef, { status })
}
