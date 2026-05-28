import Icon from "@/shared/ui/Icon/Icon"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { disablePageScroll, enablePageScroll } from "scroll-lock"

import "./MobileMenu.scss"

type MenuScreen = "main" | "shop" | "information" | "profile"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [activeTab, setActiveTab] = useState<MenuScreen>("main")

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const menuElement = menuRef.current

    if (!menuElement) return

    if (isOpen) {
      disablePageScroll(menuElement)
    } else {
      enablePageScroll(menuElement)
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        onClose()
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      enablePageScroll(menuElement)
      window.removeEventListener("resize", handleResize)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const goBack = () => {
    setActiveTab("main")
  }

  return (
    <div className="mobile-menu" ref={menuRef}>
      {activeTab === "main" && (
        <div className="mobile-menu__inner">
          <div className="mobile-menu__header">
            <button
              className="mobile-menu__close"
              onClick={onClose}
              aria-label="Close menu"
            >
              <Icon name="close" width={18} height={18} />
            </button>

            <button
              className="mobile-menu__profile-trigger"
              onClick={() => setActiveTab("profile")}
              aria-label="Open profile menu"
            >
              <Icon name="profile" width={32} height={32} />
            </button>
          </div>

          <nav className="mobile-menu__nav">
            <button
              className="mobile-menu__item"
              onClick={() => setActiveTab("shop")}
            >
              <span>Shop</span>
              <Icon name="right-arrow" width={9} height={15} />
            </button>

            <button
              className="mobile-menu__item"
              onClick={() => setActiveTab("information")}
            >
              <span>Information</span>
              <Icon name="right-arrow" width={9} height={15} />
            </button>

            <Link
              to="/quiz"
              onClick={onClose}
              className="mobile-menu__item mobile-menu__item--accent"
            >
              Take the quiz
            </Link>
          </nav>

          <div className="mobile-menu__footer">
            <a
              href="mailto:support@medstogo.com"
              className="mobile-menu__email"
            >
              support@medstogo.com
            </a>
            <p className="mobile-menu__copyright">
              © 2020 Vitamins.com / All rights reserved
            </p>
          </div>
        </div>
      )}

      {activeTab === "shop" && (
        <div className="mobile-menu__inner">
          <div className="mobile-menu__header mobile-menu__header-sub">
            <button
              onClick={goBack}
              className="mobile-menu__back"
              aria-label="Back to main menu"
            >
              <Icon name="back-arrow" width={11} height={20} />
            </button>
            <p className="mobile-menu__title">Shop</p>
          </div>

          <nav className="mobile-menu__nav">
            <Link
              className="mobile-menu__subitem"
              to="/shop/all"
              onClick={onClose}
            >
              All categories
            </Link>
            <Link
              className="mobile-menu__subitem"
              to="/shop/vitamins"
              onClick={onClose}
            >
              Vitamins & Dietary Supplements
            </Link>
            <Link
              className="mobile-menu__subitem"
              to="/shop/vitamins"
              onClick={onClose}
            >
              Weight Loss
            </Link>
            <Link
              className="mobile-menu__subitem"
              to="/shop/vitamins"
              onClick={onClose}
            >
              Minerals
            </Link>
            <Link
              className="mobile-menu__subitem"
              to="/shop/vitamins"
              onClick={onClose}
            >
              Antioxidants
            </Link>
            <Link
              className="mobile-menu__subitem"
              to="/shop/vitamins"
              onClick={onClose}
            >
              Probiotics
            </Link>
            <Link
              className="mobile-menu__subitem"
              to="/shop/vitamins"
              onClick={onClose}
            >
              Pain Relief
            </Link>
            <Link
              className="mobile-menu__subitem"
              to="/shop/vitamins"
              onClick={onClose}
            >
              Prenatal Vitamins
            </Link>
            <Link
              className="mobile-menu__subitem mobile-menu__subitem--accent"
              to="/shop/vitamins"
              onClick={onClose}
            >
              Sale%
            </Link>
          </nav>
          <div className="mobile-menu__quiz-banner">
            <h2 className="mobile-menu__quiz-banner-title">
              Don’t know what vitamins your body needs?
            </h2>
            <p className="mobile-menu__quiz-banner-text">
              Answer a few simple questions and automaticallyget a personalazed
              list of vitamins in minutes
            </p>
            <Link
              to="/quiz"
              className="mobile-menu__banner-btn"
              onClick={onClose}
            >
              Take the quiz
            </Link>
          </div>
        </div>
      )}

      {activeTab === "information" && (
        <div className="mobile-menu__inner">
          <div className="mobile-menu__header mobile-menu__header-sub">
            <button
              onClick={goBack}
              className="mobile-menu__back"
              aria-label="Back to main menu"
            >
              <Icon name="back-arrow" width={11} height={20} />
            </button>
            <p className="mobile-menu__title">Information</p>
          </div>
          <nav className="mobile-menu__nav">
            <Link
              className="mobile-menu__subitem"
              to="/privacy"
              onClick={onClose}
            >
              Subscription Cycle & Billing
            </Link>
            <Link
              className="mobile-menu__subitem"
              to="/privacy"
              onClick={onClose}
            >
              Terms & Conditions
            </Link>
            <Link
              className="mobile-menu__subitem"
              to="/privacy"
              onClick={onClose}
            >
              Privacy Policy
            </Link>
            <Link
              className="mobile-menu__subitem"
              to="/privacy"
              onClick={onClose}
            >
              Shipping & Delivery
            </Link>
            <Link
              className="mobile-menu__subitem"
              to="/privacy"
              onClick={onClose}
            >
              Return Policy
            </Link>
          </nav>
        </div>
      )}
      {activeTab === "profile" && (
        <div className="mobile-menu__inner">
          <div className="mobile-menu__header mobile-menu__header-sub">
            <button
              onClick={goBack}
              className="mobile-menu__back"
              aria-label="Back to main menu"
            >
              <Icon name="back-arrow" width={11} height={20} />
            </button>
            <p className="mobile-menu__title">Profile</p>
          </div>
          <nav className="mobile-menu__nav">
            <Link
              className="mobile-menu__subitem"
              to="/profile/orders"
              onClick={onClose}
            >
              Subscriptions
            </Link>
            <Link
              className="mobile-menu__subitem"
              to="/profile/orders"
              onClick={onClose}
            >
              Orders
            </Link>
            <Link
              className="mobile-menu__subitem"
              to="/profile/orders"
              onClick={onClose}
            >
              Account Overview
            </Link>
            <Link
              className="mobile-menu__subitem"
              to="/profile/orders"
              onClick={onClose}
            >
              Payment methods
            </Link>
            <Link
              className="mobile-menu__subitem"
              to="/profile/orders"
              onClick={onClose}
            >
              Change Password
            </Link>
            <button
              className="mobile-menu__subitem mobile-menu__subitem--accent"
              onClick={() => {
                onClose()
              }}
            >
              Sign Out
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}
