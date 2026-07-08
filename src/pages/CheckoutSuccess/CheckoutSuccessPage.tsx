import Logo from "@/shared/assets/icons/logo.svg"
import { Link } from "react-router-dom"
import s from "./CheckoutSuccessPage.module.scss"

const CheckoutSuccessPage = () => {
  return (
    <div className={s.checkoutSuccess}>
      <div className={s.checkoutSuccess__wrapper}>
        <Link
          to="/"
          className={s.checkoutSuccess__logoLink}
          aria-label="Go to homepage"
          viewTransition
        >
          <img
            src={Logo}
            alt="Logo"
            className={s.checkoutSuccess__logoImg}
            loading="lazy"
            width={168}
            height={200}
          />
        </Link>
        <p className={s.checkoutSuccess__title}>Thanks for your order!</p>
        <p className={s.checkoutSuccess__subTitle}>
          Your order is now being processed, and will be despatched shortly.
        </p>
        <Link
          to="/"
          className={s.checkoutSuccess__homeLink}
          aria-label="Go to homepage"
          viewTransition
        >
          Go to main page
        </Link>
        <p className={s.checkoutSuccess__text}>
          If you have any problems with your order, please contact us by
          telephone on +44 (0)20 7424 2800 (Mon-Fri, 10am-6pm GMT).
        </p>
      </div>
    </div>
  )
}

export default CheckoutSuccessPage
