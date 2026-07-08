import RecoverPasswordForm from "@/features/auth/ui/RecoverPasswordForm/RecoverPasswordForm"
import s from "./RecoveryPage.module.scss"
import { useTitle } from "@/shared/lib/hooks/useTitle"
import { Link } from "react-router-dom"
import Icon from "@/shared/ui/Icon/Icon"
import logoSrc from "@/shared/assets/icons/logo.svg"

const RecoveryPage = () => {
  useTitle("RecoveryPage")
  return (
    <div className={s.recoveryPage}>
      <div className={s.recoveryPage__container}>
        <div className={s.recoveryPage__content}>
          <div className={s.recoveryPage__header}>
            <Link to="/" className={s.recoveryPage__link} viewTransition>
              <img
                src={logoSrc}
                alt="Logo images"
                loading="lazy"
                width={42}
                height={50}
              />
            </Link>
            <div className={s.recoveryPage__mobWrapper}>
              <Link
                to="/"
                type="button"
                className={s.recoveryPage__backButton}
                aria-label="Go to home page"
                viewTransition
              >
                <Icon name="back_arrow" width={11} height={20} />
              </Link>
              <span className={s.recoveryPage__backText}>Account</span>
            </div>
          </div>
          <div className={s.recoveryPage__card}>
            <RecoverPasswordForm />
          </div>
          <div className={s.recoveryPage__pageFooter}>
            Remember your password?
            <Link
              to="/register"
              className={s.recoveryPage__footerLink}
              viewTransition
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecoveryPage
