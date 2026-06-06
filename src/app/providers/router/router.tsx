import MainLayout from "@/app/layouts/MainLayout/MainLayout"
import { lazy } from "react"
import { createHashRouter } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"))
const ProfilePage = lazy(() => import("@/pages/ProfilePage/ProfilePage"))

const router = createHashRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

export default router
