import MainLayout from "@/app/layouts/MainLayout/MainLayout"
import { lazy } from "react"
import { createHashRouter, Navigate } from "react-router-dom"
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
const SubscriptionsTab = lazy(
  () => import("@/features/profile/ui/SubscriptionsTab/SubscriptionsTab"),
)
const OrdersTab = lazy(
  () => import("@/features/profile/ui/OrdersTab/OrdersTab"),
)
const AccountOverviewTab = lazy(
  () => import("@/features/profile/ui/AccountOverviewTab/AccountOverviewTab"),
)

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
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="subscriptions" replace />,
          },
          {
            path: "subscriptions",
            element: <SubscriptionsTab />,
          },
          {
            path: "orders",
            element: <OrdersTab />,
          },
          {
            path: "overview",
            element: <AccountOverviewTab />,
          },
        ],
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
    path: "/quiz",
    element: <QuizPage />,
  },
])

export default router
