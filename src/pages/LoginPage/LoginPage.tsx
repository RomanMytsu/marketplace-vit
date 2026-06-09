import LoginForm from "@/features/auth/ui/LoginForm/LoginForm"
import s from "./LoginPage.module.scss"
import { useTitle } from "@/shared/lib/hooks/useTitle"

const LoginPage = () => {
  useTitle("LoginPage")
  return (
    <div className={s.pageWrapper}>
      <div className="container">
        <div className={s.card}>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
