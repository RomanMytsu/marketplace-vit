import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import clsx from "clsx"
import Icon from "@/shared/ui/Icon/Icon"
import { SUB_MENUS, type MenuScreen } from "../../model/menuConfig"
import { Modal } from "@/shared/ui/Modal/Modal"
import { logoutUser } from "@/features/auth/api/authApi"
import toast from "react-hot-toast"
import s from "./MobileMenu.module.scss"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [activeTab, setActiveTab] = useState<MenuScreen>("main")
  const navigate = useNavigate()

  const handleClose = useCallback(() => {
    setActiveTab("main")
    onClose()
  }, [onClose])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        handleClose()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleClose])

  const handleLogout = async (): Promise<void> => {
    try {
      await logoutUser()
      toast.success("Signed out successfully!")
      handleClose()
      navigate("/", { replace: true })
    } catch {
      toast.error("Failed to sign out. Please try again.")
    }
  }

  const goBack = () => setActiveTab("main")

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={s.mobileMenu}>
      {activeTab === "main" && (
        <div className={s.inner}>
          <div className={s.header}>
            <button
              className={s.close}
              onClick={handleClose}
              aria-label="Close menu"
            >
              <Icon name="close" width={18} height={18} />
            </button>
            <button
              className={s.profileTrigger}
              onClick={() => setActiveTab("profile")}
              aria-label="Open profile menu"
            >
              <Icon name="profile" width={32} height={32} />
            </button>
          </div>

          <nav className={s.nav}>
            <button className={s.item} onClick={() => setActiveTab("shop")}>
              <span>Shop</span>
              <Icon name="right-arrow" width={9} height={15} />
            </button>
            <button
              className={s.item}
              onClick={() => setActiveTab("information")}
            >
              <span>Information</span>
              <Icon name="right-arrow" width={9} height={15} />
            </button>
            <Link
              to="/quiz"
              onClick={handleClose}
              className={clsx(s.item, s.itemAccent)}
              viewTransition
            >
              Take the quiz
            </Link>
          </nav>

          <div className={s.footer}>
            <a href="mailto:support@medstogo.com" className={s.email}>
              support@medstogo.com
            </a>
            <p className={s.copyright}>
              © 2020 Vitamins.com / All rights reserved
            </p>
          </div>
        </div>
      )}
      {activeTab !== "main" &&
        (() => {
          const currentMenu = SUB_MENUS[activeTab]
          return (
            <div className={s.inner}>
              <div className={clsx(s.header, s.headerSub)}>
                <button
                  onClick={goBack}
                  className={s.back}
                  aria-label="Back to main menu"
                >
                  <Icon name="back-arrow" width={11} height={20} />
                </button>
                <p className={s.title}>{currentMenu.title}</p>
              </div>
              <nav className={s.nav}>
                {currentMenu.items.map((item, index) => (
                  <Link
                    key={index}
                    className={clsx(
                      s.subitem,
                      item.isAccent && s.subitemAccent,
                    )}
                    to={item.to}
                    onClick={handleClose}
                    viewTransition
                  >
                    {item.text}
                  </Link>
                ))}
                {activeTab === "profile" && (
                  <button
                    className={clsx(s.subitem, s.subitemAccent)}
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                )}
              </nav>
              {activeTab === "shop" && (
                <div className={s.quizBanner}>
                  <h2 className={s.quizBannerTitle}>
                    Don’t know what vitamins your body needs?
                  </h2>
                  <p className={s.quizBannerText}>
                    Answer a few simple questions and automatically get a
                    personalized list of vitamins in minutes
                  </p>
                  <Link
                    to="/quiz"
                    className={s.bannerBtn}
                    onClick={handleClose}
                    viewTransition
                  >
                    Take the quiz
                  </Link>
                </div>
              )}
            </div>
          )
        })()}
    </Modal>
  )
}
