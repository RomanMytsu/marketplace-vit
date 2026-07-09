import {
  Navigate,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom"
import { useEffect } from "react"
import { setUser } from "@/entities/auth/model/authSlice"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import { CustomToaster } from "@/shared/ui/CustomToaster"
import Header from "@/widgets/Header/Header"
import Footer from "@/widgets/Footer/Footer"
import PageLoader from "@/shared/ui/PageLoader/PageLoader"
import { selectAuthLoading, selectUser } from "@/entities/auth/model/selectors"
import "./MainLayout.scss"

const MainLayout = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const user = useAppSelector(selectUser)
  const isLoading = useAppSelector(selectAuthLoading)

  useEffect(() => {
    let unsubscribe: (() => void) | undefined
    let isCleanedUp = false

    const initAuth = async () => {
      const { getAuth, onAuthStateChanged } = await import("firebase/auth")
      const { app } = await import("@/shared/firebase/firebase")

      if (isCleanedUp) return

      const auth = getAuth(app)

      unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          dispatch(
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
            }),
          )
        } else {
          dispatch(setUser(null))
        }
      })

      if (isCleanedUp && unsubscribe) {
        unsubscribe()
      }
    }

    initAuth()

    return () => {
      isCleanedUp = true
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [dispatch])

  const renderContent = () => {
    if (isLoading) {
      return <PageLoader />
    }

    if (!user && location.pathname === "/profile") {
      return <Navigate to="/" replace />
    }

    return <Outlet />
  }

  return (
    <div className="app">
      <CustomToaster />
      <Header />
      <main className="app__content">{renderContent()}</main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

export default MainLayout
