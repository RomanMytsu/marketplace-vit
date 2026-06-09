import LoginForm from "@/features/auth/ui/LoginForm/LoginForm"
import s from "./LoginPage.module.scss"
import { useTitle } from "@/shared/lib/hooks/useTitle"
import { Link } from "react-router-dom"
import logoSrc from "@/shared/assets/icons/logo.svg"
import Icon from "@/shared/ui/Icon/Icon"

const LoginPage = () => {
  useTitle("LoginPage")
  return (
    <div className={s.login__pageWrapper}>
      <div className={s.login__container}>
        <div className={s.login__content}>
          <div className={s.login__header}>
            <Link to="/" className={s.login__link}>
              <img
                src={logoSrc}
                alt="Logo images"
                loading="lazy"
                width={42}
                height={50}
              />
            </Link>
            <div className={s.login__mobWrapper}>
              <Link
                to="/"
                type="button"
                className={s.login__backButton}
                aria-label="Go to home page"
              >
                <Icon name="back_arrow" width={11} height={20} />
              </Link>
              <span className={s.login__backText}>Account</span>
            </div>
          </div>
          <div className={s.login__card}>
            <LoginForm />
          </div>
          <div className={s.login__pageFooter}>
            Don't have an account?
            <Link to="/register" className={s.login__footerLink}>
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
