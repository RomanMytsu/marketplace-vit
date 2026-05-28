import { Link } from "react-router-dom"
import Logo from "@/shared/assets/icons/logo.svg"
import Icon from "@/shared/ui/Icon/Icon"
import "./Header.scss"
import { useState } from "react"
import { MobileMenu } from "./ui/MobileMenu/MobileMenu"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__content">
          <button
            className={`header__burger ${isMenuOpen ? "header__burger--active" : ""}`}
            onClick={handleToggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <Icon
              name={isMenuOpen ? "close" : "open-menu"}
              width={24}
              height={18}
            />
          </button>
          <div className="header__logo-wrapper">
            <Link to="/" className="header__link" aria-label="Go to homepage">
              <img src={Logo} alt="Logo" className="header__logo" />
            </Link>
          </div>
          <nav className="header__actions">
            <Link to="/login" aria-label="Profile">
              <Icon
                name="profile"
                width={32}
                height={32}
                className="header__icon-profile"
              />
            </Link>
            <Link to="/cart" className="header__cart" aria-label="Cart">
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
          </nav>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </header>
  )
}

export default Header
