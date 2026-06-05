export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export const shopLinks: FooterSection = {
  title: "Shop",
  links: [
    { label: "Vitamins & Dietary Supplements", href: "/shop/vitamins" },
    { label: "Weight Loss", href: "/shop/weight-loss" },
    { label: "Minerals", href: "/shop/minerals" },
    { label: "Antioxidants", href: "/shop/antioxidants" },
    { label: "Probiotics", href: "/shop/probiotics" },
    { label: "Pain Relief", href: "/shop/pain-relief" },
    { label: "Prenatal Vitamins", href: "/shop/prenatal" },
  ],
}

export const infoLinks: FooterSection = {
  title: "Information",
  links: [
    { label: "Terms & Conditions", href: "/info/subscription" },
    { label: "Privacy Policy", href: "/info/terms" },
    { label: "Shipping & Delivery", href: "/info/privacy" },
    { label: "Subscription Cycle & Billing", href: "/info/shipping" },
    { label: "Return Policy", href: "/info/return" },
  ],
}
