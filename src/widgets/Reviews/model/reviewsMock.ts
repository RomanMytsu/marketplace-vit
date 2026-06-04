import avatar1 from "@/shared/assets/images/avatar1.webp"
import avatar2 from "@/shared/assets/images/avatar2.webp"
import avatar3 from "@/shared/assets/images/avatar3.webp"

export interface Review {
  id: string | number
  stars: number
  title: string
  text: string
  author: {
    name: string
    avatar: string
  }
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    stars: 5,
    title: "Easy monitoring your weight goal!",
    text: "Love Vitamins! The individual packets make it so easy to remember you daily vitamins and makes travelling easy!!! 👍🏽",
    author: {
      name: "David S.",
      avatar: avatar1,
    },
  },
  {
    id: "rev-2",
    stars: 5,
    title: "High quality vitamins & supplements",
    text: "High quality vitamins & supplements, very easy on my stomach too. Great service! I really like the flexibility and options available in the subscriptions.",
    author: {
      name: "Bridget T.",
      avatar: avatar2,
    },
  },
  {
    id: "rev-3",
    stars: 5,
    title: "I love it",
    text: "I love it. It makes me feel good each morning and then it also makes me feel accomplished. ",
    author: {
      name: "Jenna Y.",
      avatar: avatar3,
    },
  },
]
