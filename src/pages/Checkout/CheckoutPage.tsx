import { Link } from "react-router-dom"
import Logo from "@/shared/assets/icons/logo.svg"
import { CheckoutForm } from "@/features/Checkout/ui/CheckoutForm/CheckoutForm"
import srcLogo from "@/shared/assets/images/checkout.webp"
import { useTitle } from "@/shared/lib/hooks/useTitle"
import s from "./CheckoutPage.module.scss"

const CheckoutPage = () => {
  useTitle("Checkout")
  return (
    <div className={s.layout}>
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
      <main className={s.content}>
        <section className={s.main}>
          <div className="container">
            <CheckoutForm />
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className="container">
          <div className={s.footer__wrapper}>
            <ul className={s.footer__list}>
              <li className={s.footer__item}>
                <Link to="/terms" className={s.footer__link} viewTransition>
                  Return Policy
                </Link>
              </li>
              <li className={s.footer__item}>
                <Link to="/terms" className={s.footer__link} viewTransition>
                  Privacy Policy
                </Link>
              </li>
              <li className={s.footer__item}>
                <Link to="/terms" className={s.footer__link} viewTransition>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
            <img
              src={srcLogo}
              alt="Footer images"
              width={335}
              height={34}
              loading="lazy"
              className={s.footer__img}
            />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CheckoutPage
