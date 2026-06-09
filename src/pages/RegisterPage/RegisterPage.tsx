import RegisterForm from "@/features/auth/ui/RegisterForm/RegisterForm"
import s from "../LoginPage/LoginPage.module.scss"
import { useTitle } from "@/shared/lib/hooks/useTitle"
import logoSrc from "@/shared/assets/icons/logo.svg"
import Icon from "@/shared/ui/Icon/Icon"
import { Link } from "react-router-dom"

const RegisterPage = () => {
  useTitle("RegisterPage")
  return (
    <div className={s.pageWrapper}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.header}>
            <Link to="/" className={s.link}>
              <img
                src={logoSrc}
                alt="Logo images"
                loading="lazy"
                className={s.imgLogo}
                width={42}
                height={50}
              />
            </Link>
            <div className={s.mobWrpper}>
              <Link
                to="/"
                type="button"
                className={s.backButton}
                aria-label="Go to home page"
              >
                <Icon
                  name="back_arrow"
                  className={s.backIcon}
                  width={11}
                  height={20}
                />
              </Link>
              <span className={s.backText}>Account</span>
            </div>
          </div>
          <div className={s.card}>
            <RegisterForm />
          </div>
          <div className={s.pageFooter}>
            Already have an account?{" "}
            <Link to="/login" className={s.footerLink}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
