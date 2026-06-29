import { Swiper, SwiperSlide } from "swiper/react"
import type { Review } from "./model/reviewsMock"
import ReviewCard from "./ReviewCard/ReviewCard"
import s from "./Reviews.module.scss"
import clsx from "clsx"

interface ReviewsProps {
  reviews: Review[]
  title: string
  subTitle?: string
  iconSrc?: string
  classContent?: string
  classTitle?: string
  classSection?: string
}
const Reviews = ({
  reviews,
  title,
  subTitle,
  iconSrc,
  classContent,
  classTitle,
  classSection,
}: ReviewsProps) => {
  if (!reviews || reviews.length === 0) return null

  return (
    <section className={clsx(s.reviews, classSection)}>
      <div className="container">
        {title && (
          <div className={clsx(s.reviews__content, classContent)}>
            {iconSrc && (
              <img
                src={iconSrc}
                alt=""
                className={s.reviews__icon}
                aria-hidden="true"
              />
            )}
            <h2 className={clsx(s.reviews__title, classTitle)}>{title}</h2>
            {subTitle && <p className={s.reviews__subTitle}>{subTitle}</p>}
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
