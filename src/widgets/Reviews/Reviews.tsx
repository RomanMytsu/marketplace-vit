import { Swiper, SwiperSlide } from "swiper/react"
import type { Review } from "./model/reviewsMock"
import s from "./Reviews.module.scss"
import ReviewCard from "./ReviewCard/ReviewCard"

interface ReviewsProps {
  reviews: Review[]
  title: string
  subTitle?: string
  iconSrc?: string
}
const Reviews: React.FC<ReviewsProps> = ({
  reviews,
  title,
  subTitle,
  iconSrc,
}) => {
  if (!reviews || reviews.length === 0) return null

  return (
    <section className={s.reviews}>
      <div className="container">
        {(title || subTitle || iconSrc) && (
          <div className={s.reviews__content}>
            <img
              src={iconSrc}
              alt="icon"
              className={s.reviews__icon}
              loading="lazy"
            />
            <h2 className={s.reviews__title}>{title}</h2>
            <p className={s.reviews__subTitle}>{subTitle}</p>
          </div>
        )}
        <div className={s.reviews__sliderBlock}>
          <Swiper
            spaceBetween={10}
            slidesPerView={"auto"}
            watchSlidesProgress={true}
            grabCursor={true}
            breakpoints={{
              1440: {
                enabled: false,
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            className={s.reviews__swiper}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className={s.reviews__slide}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Reviews
