import { Link } from "react-router-dom"
import Logo from "@/shared/assets/icons/logo.svg"
import Icon from "@/shared/ui/Icon/Icon"
import "./Header.scss"
const Header = () => {
  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__content">
          <div className="header__logo-wrapper">
            <Link to="/" className="header__link" aria-label="Medstogo Home">
              <img src={Logo} alt="Logo" className="header__logo" />
            </Link>
          </div>
          <div className="header__actions">
            <Link to="/login" aria-label="Profile">
              <Icon
                name="profile"
                width={32}
                height={32}
                className="header__icon-profile"
              />
            </Link>
            <Link to="/cart" aria-label="Cart">
              <Icon
                name="cart"
                width={32}
                height={32}
                className="header__icon-cart"
              />
            </Link>
            <Link to="/quiz" className="header__quiz-link">
              Take the quiz
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
