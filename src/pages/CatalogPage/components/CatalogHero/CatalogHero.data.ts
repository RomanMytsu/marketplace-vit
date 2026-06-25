import type { BannerVariant } from "@/shared/ui/Banners/BannerMain/BannerMain"
import heroImg from "@/shared/assets/images/hero-img.webp"
import vitaminsImg from "@/shared/assets/images/products-catalog/img-1.webp"
import painImg from "@/shared/assets/images/products-catalog/img-22.webp"

interface SlideItem {
  id: string
  variant: BannerVariant
  label?: string
  title: string
  subTitle: string
  btnText: string
  btnLink: string
  imgSrc: string
  width: string
  height: string
}

export const SLIDER_DATA: SlideItem[] = [
  {
    id: "banner-quiz",
    variant: "quiz",
    title: "Don’t know what vitamins your body needs?",
    subTitle:
      "Answer a few simple questions and automatically get a personalazed list of vitamins in minutes",
    btnText: "Take the quiz",
    btnLink: "/quiz",
    imgSrc: heroImg,
    width: "1087",
    height: "850",
  },
  {
    id: "banner-vitamins",
    variant: "vitamins",
    label: "You may also like",
    title: "Vitamins & Dietary Supplements",
    subTitle:
      "Answer a few simple questions and automatically get a personalazed list of vitamins in minutes",
    btnText: "View category",
    btnLink: "/catalog?category=vitamins",
    imgSrc: vitaminsImg,
    width: "510",
    height: "472",
  },
  {
    id: "banner-pain",
    variant: "pain-relief",
    label: "You may also like",
    title: "Pain Relief Products",
    subTitle:
      "Answer a few simple questions and automatically get a personalazed list of vitamins in minutes",
    btnText: "View category",
    btnLink: "/catalog?category=pain-relief",
    imgSrc: painImg,
    width: "510",
    height: "472",
  },
]
