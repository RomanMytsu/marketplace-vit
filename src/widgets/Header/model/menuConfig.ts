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
      { text: "All categories", to: "/catalog" },
      {
        text: "Vitamins & Dietary Supplements",
        to: "/catalog?category=Vitamins+%26+Dietary+Supplements&+Dietary+Supplements=",
      },
      { text: "Weight Loss", to: "/catalog?category=Weight Loss" },
      { text: "Minerals", to: "/catalog?category=Minerals" },
      { text: "Antioxidants", to: "/catalog?category=Antioxidants" },
      { text: "Probiotics", to: "/catalog?category=Probiotics" },
      { text: "Pain Relief", to: "/catalog?category=Pain Relief" },
      { text: "Prenatal Vitamins", to: "/catalog?category=Prenatal Vitamins" },
      { text: "Sale%", to: "/catalog?category=Sale%", isAccent: true },
    ],
  },
  information: {
    title: "Information",
    items: [
      { text: "Subscription Cycle & Billing", to: "/terms" },
      { text: "Terms & Conditions", to: "/terms" },
      { text: "Privacy Policy", to: "/terms" },
      { text: "Shipping & Delivery", to: "/terms" },
      { text: "Return Policy", to: "/terms" },
    ],
  },
  profile: {
    title: "Profile",
    items: [
      { text: "Subscriptions", to: "/profile/subscriptions" },
      { text: "Orders", to: "/profile/orders" },
      { text: "Account Overview", to: "/profile/overview" },
      { text: "Payment methods", to: "/profile/payments" },
      { text: "Change Password", to: "/profile/change-password" },
    ],
  },
}
