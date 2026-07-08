import RegisterForm from "@/features/auth/ui/RegisterForm/RegisterForm"
import s from "./RegisterPage.module.scss"
import { useTitle } from "@/shared/lib/hooks/useTitle"
import logoSrc from "@/shared/assets/icons/logo.svg"
import Icon from "@/shared/ui/Icon/Icon"
import { Link } from "react-router-dom"

const RegisterPage = () => {
  useTitle("RegisterPage")
  return (
    <div className={s.register__pageWrapper}>
      <div className={s.register__container}>
        <div className={s.register__content}>
          <div className={s.register__header}>
            <Link to="/" className={s.register__logoLink} viewTransition>
              <img
                src={logoSrc}
                alt="Logo images"
                loading="lazy"
                className={s.imgLogo}
                width={42}
                height={50}
              />
            </Link>
            <div className={s.register__mobWrapper}>
              <Link
                to="/"
                type="button"
                className={s.register__backButton}
                aria-label="Go to home page"
                viewTransition
              >
                <Icon name="back_arrow" width={11} height={20} />
              </Link>
              <span className={s.register__backText}>Account</span>
            </div>
          </div>
          <div className={s.register__card}>
            <RegisterForm />
          </div>
          <div className={s.register__pageFooter}>
            Already have an account?
            <Link to="/login" className={s.register__footerLink} viewTransition>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
