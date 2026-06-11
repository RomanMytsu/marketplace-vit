import MainLayout from "@/app/layouts/MainLayout/MainLayout"
import { lazy } from "react"
import { createHashRouter } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"))
const ProfilePage = lazy(() => import("@/pages/ProfilePage/ProfilePage"))
const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage"))
const RegisterPage = lazy(() => import("@/pages/RegisterPage/RegisterPage"))
const RecoveryPage = lazy(() => import("@/pages/RecoveryPage/RecoveryPage"))
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage/NotFoundPage"))
const TermsPage = lazy(() => import("@/pages/TermsPage/TermsPage"))
const QuizPage = lazy(() => import("@/pages/QuizPage/QuizPage"))
const PersonalPack = lazy(() => import("@/pages/PersonalPack/PersonalPack"))

const router = createHashRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/terms",
        element: <TermsPage />,
      },
      {
        path: "/personal-pack",
        element: <PersonalPack />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <RecoveryPage />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quiz",
    element: <QuizPage />,
  },
])

export default router
