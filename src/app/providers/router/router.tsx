import MainLayout from "@/app/layouts/MainLayout/MainLayout"
import { lazy } from "react"
import { createHashRouter } from "react-router-dom"

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"))

const router = createHashRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
])

export default router
