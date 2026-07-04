import { useEffect, useRef, useState, type ChangeEvent } from "react"
import srcIcon from "@/shared/assets/images/bottle.svg"
import Icon from "@/shared/ui/Icon/Icon"
import clsx from "clsx"
import { useAppDispatch } from "@/app/store/hooks"
import { addToCart } from "@/entities/cart/model/cartSlice"
import s from "./PurchaseWidget.module.scss"

interface PurchaseWidgetProps {
  id: string
  name: string
  img: string
  price: number
  oldPrice?: number
  discount?: number
}

const AUTOSHIP_OPTIONS = [30, 60, 90]

const PurchaseWidget = ({
  id,
  name,
  img,
  price,
  oldPrice,
  discount,
}: PurchaseWidgetProps) => {
  const dispatch = useAppDispatch()
  const [quantity, setQuantity] = useState<number>(1)
  const [isAutoship, setIsAutoship] = useState<boolean>(false)
  const [autoshipDays, setAutoshipDays] = useState<number>(30)
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false)

  const selectRef = useRef<HTMLDivElement>(null)

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

  const handleAutoshipToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setIsAutoship(checked)
    if (!checked) {
      setIsSelectOpen(false)
    }
  }

  const handleOptionClick = (days: number) => {
    setAutoshipDays(days)
    setIsSelectOpen(false)
  }

  const handleAddToCartClick = () => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        img,
        quantity,
        isAutoship,
        autoshipDays,
      }),
    )
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
              <span className={s.purchaseWidget__autoshipLabelDes}>
                Autoship this item every
              </span>

              <span className={s.purchaseWidget__autoshipLabelMob}>
                Deliver every
              </span>
            </p>
            <div className={s.purchaseWidget__selectWrapper} ref={selectRef}>
              <button
                type="button"
                disabled={!isAutoship}
                onClick={() => setIsSelectOpen((prev) => !prev)}
                className={clsx(s.purchaseWidget__selectTrigger, {
                  [s.purchaseWidget__selectTrigger_open]: isSelectOpen,
                })}
              >
                <span>{autoshipDays}</span>
                <Icon
                  name="select_arrow"
                  width={10}
                  height={6}
                  className={s.purchaseWidget__selectIcon}
                />
              </button>
              {isSelectOpen && isAutoship && (
                <ul className={s.purchaseWidget__selectDropdown}>
                  {AUTOSHIP_OPTIONS.map((days) => (
                    <li
                      key={days}
                      onClick={() => handleOptionClick(days)}
                      className={clsx(s.purchaseWidget__selectOption, {
                        [s.purchaseWidget__selectOption_active]:
                          autoshipDays === days,
                      })}
                    >
                      {days}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p className={s.purchaseWidget__autoshipDays}>days</p>
          </div>
          <label className={s.purchaseWidget__toggleSwitch}>
            <input
              type="checkbox"
              checked={isAutoship}
              onChange={handleAutoshipToggle}
              className={s.purchaseWidget__input}
            />
            <span className={s.purchaseWidget__slider} />
          </label>
        </div>
        <div className={s.purchaseWidget__priceBlock}>
          {oldTotal ? (
            <div className={s.purchaseWidget__discountedPrices}>
              <div className={s.purchaseWidget__oldPriceRow}>
                <p className={s.purchaseWidget__oldPrice}>${oldTotal}</p>
                <p className={s.purchaseWidget__discountBadge}> -{discount}%</p>
              </div>
              <p
                className={clsx(
                  s.purchaseWidget__price,
                  s.purchaseWidget__price_discounted,
                )}
              >
                ${currentTotal}
              </p>
            </div>
          ) : (
            <p className={s.purchaseWidget__price}>${currentTotal}</p>
          )}
          <button
            type="button"
            className={s.purchaseWidget__submitBtn}
            onClick={handleAddToCartClick}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default PurchaseWidget
