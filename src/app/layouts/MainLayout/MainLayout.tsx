import { Outlet } from "react-router-dom"
import "./MainLayout.scss"
import { lazy, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/shared/firebase/firebase"
import { setUser } from "@/entities/auth/model/authSlice"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
// import AuthModal from "@/features/auth/ui/AuthModal/AuthModal"
import { selectAuthModalIsOpen } from "@/features/auth/model/selectors"
import { CustomToaster } from "@/shared/ui/CustomToaster"
import Header from "@/widgets/Header/Header"
import Footer from "@/widgets/Footer/Footer"

const AuthModal = lazy(() => import("@/features/auth/ui/AuthModal/AuthModal"))

const MainLayout = () => {
  const dispatch = useAppDispatch()

  const isAuthModalOpen = useAppSelector(selectAuthModalIsOpen)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user))
    })
    return unsubscribe
  }, [dispatch])

  return (
    <div className="app">
      <CustomToaster />
      <Header />
      <main className="app__content">
        <Outlet />
      </main>
      <Footer />
      <AuthModal isOpen={isAuthModalOpen} />
    </div>
  )
}

export default MainLayout
