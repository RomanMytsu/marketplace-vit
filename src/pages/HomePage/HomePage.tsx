import About from "./ui/About/About"
import Hero from "./ui/Hero/Hero"
// import Products from "./ui/Products/Products"
// import Reviews from "@/widgets/Reviews/Reviews"
import TellUs from "./ui/TellUs/TellUs"
import reviewsIcon from "@/shared/assets/icons/reviews-icon.svg"
import { MOCK_REVIEWS } from "@/widgets/Reviews/model/reviewsMock"
import Ready from "./ui/Ready/Ready"
import { useTitle } from "@/shared/lib/hooks/useTitle"
import { lazy, Suspense } from "react"
import PageLoader from "@/shared/ui/PageLoader/PageLoader"

const Products = lazy(() => import("./ui/Products/Products"))
const Reviews = lazy(() => import("@/widgets/Reviews/Reviews"))

const HomePage = () => {
  useTitle("Home")
  return (
    <>
      <Hero />
      <About />
      <TellUs />
      <Suspense fallback={<PageLoader />}>
        <Products />
        <Reviews
          reviews={MOCK_REVIEWS}
          title="What healthy and happy customer says"
          subTitle="We'll help you create a health plan with vitamins, supplements, and more that help you feel your best today and support you long-term."
          iconSrc={reviewsIcon}
        />
      </Suspense>
      <Ready />
    </>
  )
}

export default HomePage
