import { useEffect } from "react"
import clsx from "clsx"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import s from "./SubscriptionsTab.module.scss"
import {
  cancelSubscription,
  getSubscriptions,
} from "@/entities/profile/model/subscriptionSlice"
import { selectSubscriptions } from "@/entities/profile/model/selectors"
import { getCategoryClass } from "@/shared/lib/helpers/categoryStyles"
import { getProductImageUrl } from "@/shared/lib/helpers/getImage"
import toast from "react-hot-toast"

const SubscriptionsTab = () => {
  const dispatch = useAppDispatch()
  const subscriptions = useAppSelector(selectSubscriptions)

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

  return (
    <div className={s.subscriptions}>
      <h2 className={s.subscriptions__title}>Subscriptions</h2>
      <div className={s.subscriptions__list}>
        {subscriptions.map((item) => {
          const bgCategoryClass = getCategoryClass(item.category, "background")
          const textCategoryClass = getCategoryClass(item.category, "text")
          const imageUrl = getProductImageUrl(item.img)
          return (
            <article key={item.id} className={s.subscriptions__card}>
              <div
                className={clsx(s.subscriptions__imageWrapper, bgCategoryClass)}
              >
                <img
                  src={imageUrl}
                  alt={item.name}
                  className={s.subscriptions__image}
                  loading="lazy"
                  width={120}
                  height={112}
                />
              </div>
              <div className={s.subscriptions__content}>
                <p
                  className={clsx(s.subscriptions__category, textCategoryClass)}
                >
                  {item.category}
                </p>
                <div className={s.subscriptions__header}>
                  <p className={s.subscriptions__name}>{item.name}</p>
                  <p className={s.subscriptions__price}>
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className={s.subscriptions__footer}>
                  <div className={s.subscriptions__deliveryInfo}>
                    <p className={s.subscriptions__text}>{item.shipment}</p>
                    <p className={s.subscriptions__deliveryDate}>
                      {item["next-shipment"]}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUnsubscribe(item.id)}
                    className={s.subscriptions__unsubscribeBtn}
                  >
                    Unsubscribe
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default SubscriptionsTab
