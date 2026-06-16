import { useTitle } from "@/shared/lib/hooks/useTitle"
import s from "./ProfilePage.module.scss"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { logoutUser } from "@/features/auth/api/authApi"
import clsx from "clsx"

interface NavigationItem {
  name: string
  path: string
}

const navItems: NavigationItem[] = [
  { name: "Subscriptions", path: "subscriptions" },
  { name: "Orders", path: "orders" },
  { name: "Account Overview", path: "overview" },
  { name: "Payment methods", path: "payments" },
  { name: "Change Password", path: "change-password" },
]

const ProfilePage = () => {
  useTitle("Profile")
  const navigate = useNavigate()

  const handleLogout = async (): Promise<void> => {
    try {
      await logoutUser()
      navigate("/", { replace: true })
    } catch (error) {
      console.error("Failed to log out:", error)
    }
  }
  return (
    <section className={s.profilePage}>
      <div className="container">
        <div className={s.profilePage__wrapper}>
          <aside className={s.profilePage__sidebar}>
            <nav className={s.profilePage__nav}>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    clsx(
                      s.profilePage__navLink,
                      isActive && s.profilePage__navLink_active,
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className={clsx(
                  s.profilePage__navLink,
                  s.profilePage__logoutBtn,
                )}
              >
                Sign out
              </button>
            </nav>
          </aside>
          <div className={s.profilePage__content}>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
