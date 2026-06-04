import About from "./ui/About/About"
import Hero from "./ui/Hero/Hero"
import Products from "./ui/Products/Products"
import Reviews from "@/widgets/Reviews/Reviews"
import TellUs from "./ui/TellUs/TellUs"
import reviewsIcon from "@/shared/assets/icons/reviews-icon.svg"
import { MOCK_REVIEWS } from "@/widgets/Reviews/model/reviewsMock"

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <TellUs />
      <Products />
      <Reviews
        reviews={MOCK_REVIEWS}
        title="What healthy and happy customer says"
        subTitle="We'll help you create a health plan with vitamins, supplements, and more that help you feel your best today and support you long-term."
        iconSrc={reviewsIcon}
      />
    </>
  )
}

export default HomePage
