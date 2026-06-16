import { useEffect } from "react"
import clsx from "clsx"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import s from "./SubscriptionsTab.module.scss"
import {
  cancelSubscription,
  getSubscriptions,
} from "@/entities/profile/subscription/model/subscriptionSlice"
import {
  selectSubscriptionError,
  selectSubscriptionLoading,
  selectSubscriptions,
} from "@/entities/profile/subscription/model/selectors"
import { getCategoryClass } from "@/shared/lib/helpers/categoryStyles"
import { getProductImageUrl } from "@/shared/lib/helpers/getImage"
import toast from "react-hot-toast"

const SubscriptionsTab = () => {
  const dispatch = useAppDispatch()
  const subscriptions = useAppSelector(selectSubscriptions)
  const isLoading = useAppSelector(selectSubscriptionLoading)
  const error = useAppSelector(selectSubscriptionError)

  useEffect(() => {
    dispatch(getSubscriptions())
  }, [dispatch])

  const handleUnsubscribe = (id: string): void => {
    toast.promise(dispatch(cancelSubscription(id)).unwrap(), {
      loading: "Canceling subscription...",
      success: "Subscription successfully canceled!",
      error: "Could not cancel. Please try again.",
    })
  }

  if (isLoading) {
    return (
      <section className={s.subscriptions}>
        <p>Loading subscriptions...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className={s.subscriptions}>
        <p className={s.error}>{error}</p>
      </section>
    )
  }

  return (
    <section className={s.subscriptions}>
      <h2 className={s.subscriptions__title}>Subscriptions</h2>
      <div className={s.subscriptions__list}>
        {subscriptions.map((item) => {
          const bgCategoryClass = getCategoryClass(item.category, "background")
          const textCategoryClass = getCategoryClass(item.category, "text")
          const imageUrl = getProductImageUrl(item.img)
          return (
            <article key={item.id} className={s.card}>
              <div className={clsx(s.card__imageWrapper, bgCategoryClass)}>
                <img
                  src={imageUrl}
                  alt={item.name}
                  className={s.card__image}
                  loading="lazy"
                />
              </div>
              <div className={s.card__content}>
                <div className={s.card__header}>
                  <span className={clsx(s.card__category, textCategoryClass)}>
                    {item.category}
                  </span>
                  <span className={s.card__price}>
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <h3 className={s.card__title}>{item.name}</h3>
                <div className={s.card__footer}>
                  <div className={s.card__deliveryInfo}>
                    <p className={s.card__text}>{item.shipment}</p>
                    <p className={s.card__deliveryDate}>
                      {item["next-shipment"]}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUnsubscribe(item.id)}
                    className={s.card__unsubscribeBtn}
                  >
                    Unsubscribe
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default SubscriptionsTab
