export type MenuScreen = "main" | "shop" | "information" | "profile"

interface MenuItem {
  text: string
  to: string
  isAccent?: boolean
}

export const SUB_MENUS: Record<
  Exclude<MenuScreen, "main">,
  { title: string; items: MenuItem[] }
> = {
  shop: {
    title: "Shop",
    items: [
      { text: "All categories", to: "/shop/all" },
      { text: "Vitamins & Dietary Supplements", to: "/shop/vitamins" },
      { text: "Weight Loss", to: "/shop/vitamins" },
      { text: "Minerals", to: "/shop/vitamins" },
      { text: "Antioxidants", to: "/shop/vitamins" },
      { text: "Probiotics", to: "/shop/vitamins" },
      { text: "Pain Relief", to: "/shop/vitamins" },
      { text: "Prenatal Vitamins", to: "/shop/vitamins" },
      { text: "Sale%", to: "/shop/vitamins", isAccent: true },
    ],
  },
  information: {
    title: "Information",
    items: [
      { text: "Subscription Cycle & Billing", to: "/privacy" },
      { text: "Terms & Conditions", to: "/privacy" },
      { text: "Privacy Policy", to: "/privacy" },
      { text: "Shipping & Delivery", to: "/privacy" },
      { text: "Return Policy", to: "/privacy" },
    ],
  },
  profile: {
    title: "Profile",
    items: [
      { text: "Subscriptions", to: "/profile/orders" },
      { text: "Orders", to: "/profile/orders" },
      { text: "Account Overview", to: "/profile/orders" },
      { text: "Payment methods", to: "/profile/orders" },
      { text: "Change Password", to: "/profile/orders" },
    ],
  },
}
