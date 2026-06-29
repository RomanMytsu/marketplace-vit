import Reviews from "@/widgets/Reviews/Reviews"
import s from "./CatalogReview.module.scss"
import { MOCK_REVIEWS } from "@/widgets/Reviews/model/reviewsMock"

const CatalogReview = () => {
  return (
    <Reviews
      reviews={MOCK_REVIEWS}
      title="What healthy and happy customer says"
      classContent={s.catalogReview__content}
      classTitle={s.catalogReview__title}
      classSection={s.catalogReview}
    />
  )
}

export default CatalogReview
