import { useState, type ChangeEvent } from "react"
import srcIcon from "@/shared/assets/images/bottle.svg"
import s from "./PurchaseWidget.module.scss"

interface PurchaseWidgetProps {
  price: number
  oldPrice?: number
  discount?: number
}

const PurchaseWidget = ({ price, oldPrice, discount }: PurchaseWidgetProps) => {
  const [quantity, setQuantity] = useState<number>(1)
  const [isAutoship, setIsAutoship] = useState<boolean>(false)
  const [autoshipDays, setAutoshipDays] = useState<number>(30)

  const handleIncrement = () => setQuantity((prev) => prev + 1)
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAutoshipDaysChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAutoshipDays(Number(e.target.value))
  }

  const handleAutoshipToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAutoship(e.target.checked)
  }

  const currentTotal = (price * quantity).toFixed(2)
  const oldTotal = oldPrice ? (oldPrice * quantity).toFixed(2) : null

  return (
    <div className={s.purchaseWidget}>
      <div className={s.purchaseWidget__controls}>
        <div className={s.detailsPage__metaSpec}>
          <img src={srcIcon} alt="Icon" width={50} height={60} />
          <div className={s.detailsPage__metaText}>
            <span className={s.detailsPage__metaMain}>90 Capsules</span>
            <span className={s.detailsPage__metaSub}>500 mg plastic can</span>
          </div>
        </div>
        <div className={s.purchaseWidget__counter}>
          <button
            type="button"
            onClick={handleDecrement}
            className={s.purchaseWidget__counterBtn}
          >
            −
          </button>
          <span className={s.purchaseWidget__counterValue}>{quantity}</span>
          <button
            type="button"
            onClick={handleIncrement}
            className={s.purchaseWidget__counterBtn}
          >
            +
          </button>
        </div>

        <div className={s.purchaseWidget__autoship}>
          <span className={s.purchaseWidget__autoshipLabel}>
            Autoship this item every
          </span>
          <div className={s.purchaseWidget__selectWrapper}>
            <select
              value={autoshipDays}
              onChange={handleAutoshipDaysChange}
              className={s.purchaseWidget__select}
            >
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={90}>90</option>
            </select>
          </div>
          <span className={s.purchaseWidget__autoshipDays}>days</span>

          <label className={s.toggleSwitch}>
            <input
              type="checkbox"
              checked={isAutoship}
              onChange={handleAutoshipToggle}
              className={s.toggleSwitch__input}
            />
            <span className={s.toggleSwitch__slider} />
          </label>
        </div>
      </div>

      <div className={s.purchaseWidget__actionRow}>
        <div className={s.purchaseWidget__priceBlock}>
          {oldTotal ? (
            <div className={s.purchaseWidget__discountedPrices}>
              <div className={s.purchaseWidget__oldPriceRow}>
                <span className={s.purchaseWidget__oldPrice}>${oldTotal}</span>
                <span className={s.purchaseWidget__discountBadge}>
                  -{discount}%
                </span>
              </div>
              <span className={s.purchaseWidget__price}>${currentTotal}</span>
            </div>
          ) : (
            <span className={s.purchaseWidget__price}>${currentTotal}</span>
          )}
        </div>
        <button type="button" className={s.purchaseWidget__submitBtn}>
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default PurchaseWidget
