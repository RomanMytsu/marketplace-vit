import { useNavigate } from "react-router-dom"
import { Modal } from "@/shared/ui/Modal/Modal"
import Icon from "@/shared/ui/Icon/Icon"
import { useAppSelector } from "@/app/store/hooks"
import { CartItem } from "./ui/CartItem"
import s from "./Cart.module.scss"

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const cartItems = useAppSelector((state) => state.cart.items)
  const navigate = useNavigate()

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)

  const handleCheckoutClick = () => {
    onClose()
    navigate("/checkout")
  }

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
        {cartItems.length === 0 ? (
          <div className={s.cartModal__emptyState}>
            <Icon
              name="empty-cart"
              width={294}
              height={350}
              className={s.cartModal__emptyIcon}
            />
            <p className={s.cartModal__emptyText}>Your cart is empty</p>
          </div>
        ) : (
          <div className={s.cartModal__list}>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} onLinkClick={onClose} />
            ))}
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className={s.cartModal__footer}>
          <button
            type="button"
            className={s.cartModal__checkoutBtn}
            onClick={handleCheckoutClick}
          >
            Check Out • ${totalPrice}
          </button>
        </div>
      )}
    </Modal>
  )
}
