export interface CartItem {
  id: string
  name: string
  price: number
  img: string
  quantity: number
  isAutoship: boolean
  autoshipDays: number
}

export interface CartState {
  items: CartItem[]
}
