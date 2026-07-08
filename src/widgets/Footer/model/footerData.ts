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
      href: "/catalog?category=Vitamins+%26+Dietary+Supplements&+Dietary+Supplements=",
    },
    { id: "2", label: "Weight Loss", href: "/catalog?category=Weight Loss" },
    { id: "3", label: "Minerals", href: "/catalog?category=Minerals" },
    { id: "4", label: "Antioxidants", href: "/catalog?category=Antioxidants" },
    { id: "5", label: "Probiotics", href: "/catalog?category=Probiotics" },
    { id: "6", label: "Pain Relief", href: "/catalog?category=Pain Relief" },
    { id: "7", label: "Prenatal Vitamins", href: "/catalog?category=Prenatal Vitamins" },
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
