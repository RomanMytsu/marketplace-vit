import { db } from "@/shared/firebase/firebase"
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"
import type { FirestoreSubscription } from "../model/types"

export const fetchProfileSubscriptions = async (): Promise<
  FirestoreSubscription[]
> => {
  const querySnapshot = await getDocs(collection(db, "profile-subscriptions"))

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as FirestoreSubscription[]
}

export const updateSubscriptionStatusInFirebase = async (
  id: string,
  status: "cancelled",
): Promise<void> => {
  const docRef = doc(db, "profile-subscriptions", id)
  await updateDoc(docRef, { status })
}
