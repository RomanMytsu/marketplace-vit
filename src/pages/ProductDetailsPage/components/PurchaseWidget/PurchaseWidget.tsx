import { useState, type ChangeEvent } from "react"
import srcIcon from "@/shared/assets/images/bottle.svg"
import s from "./PurchaseWidget.module.scss"
import Icon from "@/shared/ui/Icon/Icon"
import clsx from "clsx"

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setQuantity(value === "" ? 0 : Number(value))
  }

  const handleInputBlur = () => {
    if (quantity < 1) {
      setQuantity(1)
    }
  }

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
        <img src={srcIcon} alt="Icon" width={50} height={60} loading="lazy" />
        <div className={s.purchaseWidget__metaSpec}>
          <div className={s.purchaseWidget__metaText}>
            <p className={s.purchaseWidget__metaMain}>90 Capsules</p>
            <p className={s.purchaseWidget__metaSub}>500 mg plastic can</p>
          </div>
          <div className={s.purchaseWidget__counter}>
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className={s.purchaseWidget__counterBtn}
            >
              <Icon
                name="minus"
                width={24}
                height={24}
                className={s.purchaseWidget__iconMinus}
              />
            </button>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={quantity === 0 ? "" : quantity}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={s.purchaseWidget__counterInput}
            />
            <button
              type="button"
              onClick={handleIncrement}
              className={s.purchaseWidget__counterBtn}
            >
              <Icon name="plus" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>

      <div className={s.purchaseWidget__actionRow}>
        <div className={s.purchaseWidget__autoshipWrapper}>
          <div
            className={clsx(s.purchaseWidget__autoship, {
              [s.purchaseWidget__autoship_inactive]: !isAutoship,
            })}
          >
            <p className={s.purchaseWidget__autoshipLabel}>
              Autoship this item every
            </p>
            <div className={s.purchaseWidget__selectWrapper}>
              <Icon
                name="select_arrow"
                width={10}
                height={6}
                className={s.purchaseWidget__selectIcon}
              />
              <select
                value={autoshipDays}
                onChange={handleAutoshipDaysChange}
                disabled={!isAutoship}
                className={s.purchaseWidget__select}
              >
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={90}>90</option>
              </select>
            </div>
            <p className={s.purchaseWidget__autoshipDays}>days</p>
          </div>
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
          <button type="button" className={s.purchaseWidget__submitBtn}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default PurchaseWidget
