import type React from "react"
import type { Review } from "../model/reviewsMock"
import s from "./ReviewCard.module.scss"

interface ReviewCardProps {
  review: Review
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <article className={s.card}>
      <div className={s.card__stars}>
        {Array.from({ length: review.stars }).map((_, index) => (
          <svg
            key={index}
            width="20"
            height="19"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
              fill="#FFC329"
            />
          </svg>
        ))}
      </div>
      <h3 className={s.card__title}>{review.title}</h3>
      <p className={s.card__text}>{review.text}</p>
      <div className={s.card__author}>
        <img
          src={review.author.avatar}
          alt={review.author.name}
          className={s.card__avatar}
          width={48}
          height={48}
        />
        <p className={s.card__authorName}>{review.author.name}</p>
      </div>
    </article>
  )
}

export default ReviewCard
