import { Outlet } from "react-router-dom"

import "./MainLayout.scss"
import Header from "@/widgets/Header/Header"
import Footer from "@/widgets/Footer/Footer"

const MainLayout = () => {
  return (
    <div className="app">
      <Header />
      <main className="app__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
