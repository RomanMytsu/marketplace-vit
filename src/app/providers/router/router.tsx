import MainLayout from "@/app/layouts/MainLayout/MainLayout"
import HomePage from "@/pages/HomePage/HomePage"
import { createHashRouter } from "react-router-dom"

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
