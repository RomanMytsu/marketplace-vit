import { Link } from "react-router-dom"
import Logo from "@/shared/assets/icons/logo.svg"
import Icon from "@/shared/ui/Icon/Icon"
import { useEffect, useState } from "react"
import { MobileMenu } from "./ui/MobileMenu/MobileMenu"
import QuizLink from "@/shared/ui/QuizLink/QuizLink"
import s from "./Header.module.scss"
import clsx from "clsx"

const HEADER_HEIGHT = 55

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > HEADER_HEIGHT)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={clsx(s.header, isScrolled && s.headerScrolled)}>
      <div className={clsx(s.container)}>
        <div className={s.content}>
          <button
            className={clsx(s.burger, isMenuOpen && s.burgerActive)}
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
          <div className={s.logoWrapper}>
            <Link to="/" className={s.link} aria-label="Go to homepage">
              <img src={Logo} alt="Logo" className={s.logo} />
            </Link>
          </div>
          <nav className={s.actions}>
            <Link to="/login" aria-label="Profile">
              <Icon
                name="profile"
                width={32}
                height={32}
                className={s.iconProfile}
              />
            </Link>
            <Link to="/cart" className={s.cart} aria-label="Cart">
              <Icon name="cart" width={32} height={32} className={s.iconCart} />
            </Link>
            <QuizLink />
          </nav>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </header>
  )
}

export default Header
