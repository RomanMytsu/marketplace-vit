import { Modal } from "@/shared/ui/Modal/Modal"
import Icon from "@/shared/ui/Icon/Icon"
import s from "./Cart.module.scss"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/entities/cart/model/cartSlice"

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const dispatch = useAppDispatch()

  const cartItems = useAppSelector((state) => state.cart.items)

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={s.cartModal}>
      <div className={s.cartModal__header}>
        <h2 className={s.cartModal__title}>Cart</h2>
        <button
          className={s.cartModal__closeBtn}
          onClick={onClose}
          aria-label="Close cart"
        >
          <Icon name="close" width={18} height={18} />
        </button>
      </div>
      <div className={s.cartModal__content}>
        {/* 3. Условный рендеринг: если пустая корзина — показываем Empty State */}
        {cartItems.length === 0 ? (
          <div className={s.cartModal__emptyState}>Your cart is empty</div>
        ) : (
          <div className={s.cartModal__list}>
            {cartItems.map((item) => (
              <div key={item.id} className={s.cartItem}>
                <img
                  src={item.img}
                  alt={item.name}
                  className={s.cartItem__img}
                  loading="lazy"
                />

                <div className={s.cartItem__info}>
                  <div className={s.cartItem__row}>
                    <h4 className={s.cartItem__name}>{item.name}</h4>
                    <button
                      className={s.cartItem__deleteBtn}
                      onClick={() => dispatch(removeFromCart(item.id))}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Icon name="close" width={14} height={14} />
                    </button>
                  </div>

                  {item.isAutoship && (
                    <p className={s.cartItem__autoshipBadge}>
                      Autoship every {item.autoshipDays} days
                    </p>
                  )}

                  <div className={s.cartItem__footerRow}>
                    {/* Контрол изменения количества */}
                    <div className={s.cartItem__counter}>
                      <button
                        type="button"
                        className={s.cartItem__counterBtn}
                        onClick={() =>
                          dispatch(
                            updateCartItemQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Icon name="minus" width={16} height={16} />
                      </button>
                      <span className={s.cartItem__counterValue}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className={s.cartItem__counterBtn}
                        onClick={() =>
                          dispatch(
                            updateCartItemQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                      >
                        <Icon name="plus" width={16} height={16} />
                      </button>
                    </div>

                    {/* Цена за позицию (с учетом количества) */}
                    <p className={s.cartItem__price}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className={s.cartModal__footer}>
          <button className={s.cartModal__checkoutBtn}>
            Check Out • ${totalPrice}
          </button>
        </div>
      )}
    </Modal>
  )
}
