export interface FooterLink {
  id: string
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
    {
      id: "1",
      label: "Vitamins & Dietary Supplements",
      href: "/shop/vitamins",
    },
    { id: "2", label: "Weight Loss", href: "/shop/weight-loss" },
    { id: "3", label: "Minerals", href: "/shop/minerals" },
    { id: "4", label: "Antioxidants", href: "/shop/antioxidants" },
    { id: "5", label: "Probiotics", href: "/shop/probiotics" },
    { id: "6", label: "Pain Relief", href: "/shop/pain-relief" },
    { id: "7", label: "Prenatal Vitamins", href: "/shop/prenatal" },
  ],
}

export const infoLinks: FooterSection = {
  title: "Information",
  links: [
    { id: "1", label: "Terms & Conditions", href: "/terms" },
    { id: "2", label: "Privacy Policy", href: "/terms" },
    { id: "3", label: "Shipping & Delivery", href: "/terms" },
    { id: "4", label: "Subscription Cycle & Billing", href: "/terms" },
    { id: "5", label: "Return Policy", href: "/terms" },
  ],
}
