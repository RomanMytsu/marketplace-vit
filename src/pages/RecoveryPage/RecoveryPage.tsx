import RecoverPasswordForm from "@/features/auth/ui/RecoverPasswordForm/RecoverPasswordForm"
import s from "../LoginPage/LoginPage.module.scss"
import { useTitle } from "@/shared/lib/hooks/useTitle"

const RecoveryPage = () => {
  useTitle("RecoveryPage")
  return (
    <div className={s.pageWrapper}>
      <div className={s.card}>
        <RecoverPasswordForm />
      </div>
    </div>
  )
}

export default RecoveryPage
