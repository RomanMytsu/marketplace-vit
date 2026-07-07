import { Link } from "react-router-dom"
import Logo from "@/shared/assets/icons/logo.svg"
import s from "./CheckoutPage.module.scss"
import { CheckoutForm } from "@/features/Checkout/ui/CheckoutForm/CheckoutForm"

const CheckoutPage = () => {
  return (
    <>
      <header className={s.header}>
        <div className="container">
          <Link
            to="/"
            className={s.header__link}
            aria-label="Go to homepage"
            viewTransition
          >
            <img
              src={Logo}
              alt="Logo"
              className={s.header__logo}
              loading="lazy"
              width={42}
              height={50}
            />
          </Link>
        </div>
      </header>
      <main>
        <section>
          <div className="container">
            <CheckoutForm />
          </div>
        </section>
      </main>

      <footer></footer>
    </>
  )
}

export default CheckoutPage
