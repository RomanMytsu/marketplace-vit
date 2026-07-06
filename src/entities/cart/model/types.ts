export interface CartItem {
  id: string
  name: string
  price: number
  img: string
  category: string
  quantity: number
  isAutoship: boolean
  autoshipDays: number
  oldPrice?: number
  discount?: number
}

export interface CartState {
  items: CartItem[]
}
