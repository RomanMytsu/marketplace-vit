import { useState } from "react"
import { useFormikContext } from "formik"
import Button from "@/shared/ui/Button"
import type { CheckoutFormFields } from "../../model/checkoutTypes"
import { useAppSelector } from "@/app/store/hooks"
import { getProductImageUrl } from "@/shared/lib/helpers/getImage"
import { getCategoryClass } from "@/shared/lib/helpers/categoryStyles"
import clsx from "clsx"
import Icon from "@/shared/ui/Icon/Icon"
import s from "./CheckoutSummary.module.scss"

const SHIPPING_PRICE = 9.2

export const CheckoutSummary = () => {
  const { isValid, dirty, isSubmitting } =
    useFormikContext<CheckoutFormFields>()
  const cartItems = useAppSelector((state) => state.cart.items)

  const [isMobileExpanded, setIsMobileExpanded] = useState(false)

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const totalDiscount = cartItems.reduce((sum, item) => {
    if (item.oldPrice && item.oldPrice > item.price) {
      return sum + (item.oldPrice - item.price) * item.quantity
    }
    return sum
  }, 0)

  const todayTotal = subtotal + SHIPPING_PRICE

  return (
    <div
      className={clsx(s.summaryCard, {
        [s.summaryCard_expanded]: isMobileExpanded,
      })}
    >
      <button
        type="button"
        className={s.summaryCard__mobileToggle}
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        aria-expanded={isMobileExpanded}
      >
        <div className={s.summaryCard__mobileTitle}>
          <Icon
            name="cart"
            width={32}
            height={32}
            className={s.summaryCard__cartIcon}
          />
          <span>Today's total</span>
          <Icon
            name="select_arrow"
            width={15}
            height={9}
            className={clsx(s.summaryCard__arrowIcon, {
              [s.summaryCard__arrowIcon_rotated]: isMobileExpanded,
            })}
          />
        </div>
        <span className={s.summaryCard__mobilePrice}>
          ${todayTotal.toFixed(2)}
        </span>
      </button>

      <div className={s.summaryCard__body}>
        <div className={s.summaryCard__productsList}>
          {cartItems.map((item) => {
            const imgSrc = getProductImageUrl(item.img)
            const bgClass = getCategoryClass(item.category, "background")

            return (
              <div key={item.id} className={s.summaryCard__productItem}>
                <div className={clsx(s.summaryCard__imgWrapper, bgClass)}>
                  <img
                    src={imgSrc}
                    alt={item.name}
                    className={s.summaryCard__img}
                    width={70}
                    height={65}
                    loading="lazy"
                  />
                </div>

                <div className={s.summaryCard__info}>
                  <p className={s.summaryCard__name}>
                    {item.quantity} x {item.name}
                  </p>

                  <div className={s.summaryCard__priceBlock}>
                    {item.oldPrice && item.oldPrice > item.price ? (
                      <>
                        <span className={s.summaryCard__oldPrice}>
                          ${(item.oldPrice * item.quantity).toFixed(2)}
                        </span>
                        <span
                          className={clsx(
                            s.summaryCard__price,
                            s.summaryCard__price_discounted,
                          )}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className={s.summaryCard__price}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className={s.summaryCard__totals}>
          <div className={s.summaryCard__totalRow}>
            Subtotal: <span>${subtotal.toFixed(2)}</span>
          </div>

          {totalDiscount > 0 && (
            <div
              className={clsx(
                s.summaryCard__totalRow,
                s.summaryCard__totalRow_discount,
              )}
            >
              Discount: <span>-${totalDiscount.toFixed(2)}</span>
            </div>
          )}

          <div className={s.summaryCard__totalRow}>
            Shipping: <span>${SHIPPING_PRICE.toFixed(2)}</span>
          </div>
          <div className={s.summaryCard__totalPrice}>
            Today's Total: <span>${todayTotal.toFixed(2)}</span>
          </div>
        </div>
        <Button
          type="submit"
          className={s.summaryCard__placeOrderBtn}
          disabled={!isValid || !dirty || isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Place order"}
        </Button>
      </div>
    </div>
  )
}
