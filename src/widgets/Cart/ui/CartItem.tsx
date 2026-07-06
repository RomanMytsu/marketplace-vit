import { useEffect, useRef, useState, type ChangeEvent } from "react"
import type { CartItem as CartItemType } from "@/entities/cart/model/types"
import { useAppDispatch } from "@/app/store/hooks"
import {
  removeFromCart,
  updateCartItemQuantity,
  updateCartItemAutoship,
} from "@/entities/cart/model/cartSlice"
import { getProductImageUrl } from "@/shared/lib/helpers/getImage"
import Icon from "@/shared/ui/Icon/Icon"
import { getCategoryClass } from "@/shared/lib/helpers/categoryStyles"
import { Link } from "react-router-dom"
import s from "./CartItem.module.scss"
import clsx from "clsx"

interface CartItemProps {
  item: CartItemType
  onLinkClick?: () => void
}

const AUTOSHIP_OPTIONS = [30, 60, 90]

export const CartItem = ({ item, onLinkClick }: CartItemProps) => {
  const dispatch = useAppDispatch()
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const imgSrc = getProductImageUrl(item.img)
  const bgClass = getCategoryClass(item.category, "background")

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

  const handleQuantityDecrement = () => {
    dispatch(
      updateCartItemQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      }),
    )
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    dispatch(
      updateCartItemQuantity({
        id: item.id,
        quantity: value === "" ? 0 : Number(value),
      }),
    )
  }

  const handleInputBlur = () => {
    if (item.quantity < 1) {
      dispatch(
        updateCartItemQuantity({
          id: item.id,
          quantity: 1,
        }),
      )
    }
  }

  const handleQuantityIncrement = () => {
    dispatch(
      updateCartItemQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      }),
    )
  }

  const handleAutoshipToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateCartItemAutoship({
        id: item.id,
        isAutoship: e.target.checked,
        autoshipDays: item.autoshipDays || 30,
      }),
    )
  }

  const handleAutoshipDaysSelect = (days: number) => {
    dispatch(
      updateCartItemAutoship({
        id: item.id,
        isAutoship: item.isAutoship,
        autoshipDays: days,
      }),
    )
    setIsSelectOpen(false)
  }

  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
  }
  return (
    <article className={s.cartItem}>
      <div className={s.cartItem__wrapper}>
        <Link to={`/catalog/${item.id}`} onClick={onLinkClick} viewTransition>
          <div className={`${s.cartItem__imgWrapper} ${bgClass}`}>
            <img
              src={imgSrc}
              alt={item.name}
              className={s.cartItem__img}
              width={120}
              height={112}
              loading="lazy"
            />
          </div>
        </Link>

        <div className={s.cartItem__info}>
          <div className={s.cartItem__row}>
            <h4 className={s.cartItem__name}>{item.name}</h4>
            <button
              className={s.cartItem__deleteBtn}
              onClick={handleRemove}
              aria-label={`Remove ${item.name} from cart`}
            >
              <Icon name="close" width={14} height={14} />
            </button>
          </div>

          <div className={s.cartItem__mainRow}>
            <div className={s.cartItem__counter}>
              <button
                type="button"
                className={s.cartItem__counterBtn}
                disabled={item.quantity <= 1}
                onClick={handleQuantityDecrement}
              >
                <Icon name="minus" width={16} height={16} />
              </button>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={item.quantity === 0 ? "" : item.quantity}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={s.cartItem__counterInput}
              />
              <button
                type="button"
                className={s.cartItem__counterBtn}
                onClick={handleQuantityIncrement}
              >
                <Icon name="plus" width={16} height={16} />
              </button>
            </div>

            {item.oldPrice ? (
              <div className={s.cartItem__discountedPrices}>
                <p className={s.cartItem__oldPrice}>
                  ${item.oldPrice.toFixed(2)}
                </p>
                <p
                  className={clsx(
                    s.cartItem__price,
                    s.cartItem__price_discounted,
                  )}
                >
                  ${item.price.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className={s.cartItem__price}>${item.price.toFixed(2)}</p>
            )}
          </div>

          <div className={s.cartItem__autoshipRow}>
            <label className={s.cartItem__checkboxLabel}>
              <input
                type="checkbox"
                checked={item.isAutoship}
                className={s.cartItem__checkbox}
                onChange={handleAutoshipToggle}
              />
              <span className={s.cartItem__customCheckbox} />
              <p className={s.cartItem__checkboxText}>
                <span className={s.cartItem__autoshipLabelDes}>
                  Autoship every
                </span>
                <span className={s.cartItem__autoshipLabelMob}>
                  Deliver every
                </span>
              </p>
            </label>

            <div
              className={clsx(s.cartItem__selectWrapper, {
                [s.cartItem__selectWrapper_disabled]: !item.isAutoship,
                [s.cartItem__selectWrapper_open]: isSelectOpen,
              })}
              ref={selectRef}
            >
              <button
                type="button"
                className={s.cartItem__selectBtn}
                disabled={!item.isAutoship}
                onClick={() => setIsSelectOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isSelectOpen}
              >
                <span>{item.autoshipDays || 30}</span>
                <Icon
                  name="select_arrow"
                  width={10}
                  height={6}
                  className={s.cartItem__selectIcon}
                />
              </button>

              {isSelectOpen && (
                <ul className={s.cartItem__dropdown} role="listbox">
                  {AUTOSHIP_OPTIONS.map((option) => (
                    <li
                      key={option}
                      className={clsx(s.cartItem__dropdownItem, {
                        [s.cartItem__dropdownItem_active]:
                          item.autoshipDays === option,
                      })}
                      role="option"
                      aria-selected={item.autoshipDays === option}
                      onClick={() => handleAutoshipDaysSelect(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <span className={s.cartItem__daysText}>days</span>
          </div>
        </div>
      </div>
    </article>
  )
}
