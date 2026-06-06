import { Modal } from "@/shared/ui/Modal/Modal"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import { closeAuthModal } from "../../model/authModalSlice"
import { selectAuthModalView } from "../../model/selectors"

import LoginForm from "../LoginForm/LoginForm"
import RegisterForm from "../RegisterForm/RegisterForm"
import RecoverPasswordForm from "../RecoverPasswordForm/RecoverPasswordForm"

interface Props {
  isOpen: boolean
}

const AuthModal = ({ isOpen }: Props) => {
  const dispatch = useAppDispatch()
  const currentView = useAppSelector(selectAuthModalView)

  const renderForm = () => {
    switch (currentView) {
      case "login":
        return <LoginForm />
      case "register":
        return <RegisterForm />
      case "recovery":
        return <RecoverPasswordForm />
      default:
        return <LoginForm />
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeAuthModal())}>
      {renderForm()}
    </Modal>
  )
}

export default AuthModal
