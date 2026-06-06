import { useAppSelector } from "@/app/store/hooks"
import { selectUser } from "@/entities/auth/model/selectors"
import { Navigate } from "react-router-dom"

interface Props {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const user = useAppSelector(selectUser)

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
