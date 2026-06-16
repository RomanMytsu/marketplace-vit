export type SubscriptionStatus = "active" | "cancelled"

export interface FirestoreSubscription {
  id: string
  category: string
  img: string
  name: string
  "next-shipment": string
  price: number
  shipment: string
  status?: SubscriptionStatus
}
