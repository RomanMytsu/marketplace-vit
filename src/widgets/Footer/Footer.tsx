import { Link } from "react-router-dom"
import s from "./Footer.module.scss"
import logoSrc from "@/shared/assets/icons/logo.svg"
import { infoLinks, shopLinks } from "./model/footerData"
import facebook from "@/shared/assets/icons/facebook.svg"
import instagram from "@/shared/assets/icons/instagram.svg"
import clsx from "clsx"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className={s.footer}>
      <div className={clsx("container", s.footer__container)}>
        <div className={s.footer__wrapper}>
          <div className={s.footer__logoWrapper}>
            <Link
              to="/"
              className={s.footer__logoLink}
              aria-label="Go to homepage"
              viewTransition
            >
              <img src={logoSrc} alt="Logo" className={s.footer__logo} />
            </Link>
            <p className={s.footer__copyright}>
              © {currentYear} Vitamins.com / All rights reserved
            </p>
          </div>
          <div className={s.footer__navBlock}>
            <div className={s.footer__menu}>
              <h3 className={s.footer__title}>{shopLinks.title}</h3>
              <ul className={`${s.footer__list} ${s.footer__shopList}`}>
                {shopLinks.links.map((link) => (
                  <li key={link.id} className={s.footer__item}>
                    <Link
                      to={link.href}
                      className={s.footer__link}
                      viewTransition
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.footer__menu}>
              <h3 className={s.footer__title}>{infoLinks.title}</h3>
              <ul className={s.footer__list}>
                {infoLinks.links.map((link) => (
                  <li key={link.id} className={s.footer__item}>
                    <Link
                      to={link.href}
                      className={s.footer__link}
                      viewTransition
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.footer__menu}>
              <h3 className={s.footer__title}>Contact</h3>
              <ul className={s.footer__list}>
                <li className={s.footer__item}>
                  <a
                    href="mailto:support@medstogo.com"
                    className={s.footer__contactLink}
                  >
                    support@medstogo.com
                  </a>
                </li>
                <li className={s.footer__item}>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className={s.footer__socialLink}
                  >
                    <img
                      src={facebook}
                      alt="Facebook Icon"
                      className={s.footer__iconFb}
                      loading="lazy"
                      width={22}
                      height={22}
                    />
                    Facebook
                  </a>
                </li>
                <li className={s.footer__item}>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className={s.footer__socialLink}
                  >
                    <img
                      src={instagram}
                      alt="Instagram Icon"
                      className={s.footer__iconFb}
                      loading="lazy"
                      width={22}
                      height={22}
                    />
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
