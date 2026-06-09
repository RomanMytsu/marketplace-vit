import { Outlet } from "react-router-dom"
import "./MainLayout.scss"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/shared/firebase/firebase"
import { setUser } from "@/entities/auth/model/authSlice"
import { useAppDispatch } from "@/app/store/hooks"
import { CustomToaster } from "@/shared/ui/CustomToaster"
import Header from "@/widgets/Header/Header"
import Footer from "@/widgets/Footer/Footer"

const MainLayout = () => {
  const dispatch = useAppDispatch()

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
    </div>
  )
}

export default MainLayout
