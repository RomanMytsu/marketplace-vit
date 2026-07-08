import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import logoWhite from "@/shared/assets/images/white-logo.svg"
import logo from "@/shared/assets/icons/logo.svg"
import Icon from "@/shared/ui/Icon/Icon"
import Circle from "@/shared/ui/Circle/Circle"
import Ellipse from "@/shared/ui/Ellipse/Ellipse"
import clsx from "clsx"
import s from "./QuizStepLayout.module.scss"

interface QuizStepLayoutProps {
  title: string
  currentStep: number
  totalSteps: number
  showBack: boolean
  onBack: () => void
  children: ReactNode
  layoutSize?: "standard" | "wide"
}

export const QuizStepLayout = ({
  title,
  currentStep,
  totalSteps,
  showBack,
  onBack,
  children,
  layoutSize = "standard",
}: QuizStepLayoutProps) => {
  return (
    <div className={clsx(s.layout, s[`layout--step-${currentStep}`])}>
      <div className={s.layout__sidebarBg} aria-hidden="true" />
      <div className={s.layout__topBar}>
        <Link to="/" className={s.layout__logoLink} viewTransition>
          <picture>
            <source media="(max-width: 768px)" srcSet={logo} />
            <img
              src={logoWhite}
              alt="Logo Image"
              width={42}
              height={50}
              loading="lazy"
              className={s.layout__logoImg}
            />
          </picture>
        </Link>
        <p className={s.layout__stepCounter}>
          {currentStep}/{totalSteps}
        </p>
      </div>
      <h1 className={s.layout__mainTitle}>{title}</h1>
      <div
        className={clsx(s.layout__contentWrapper, {
          [s["layout__contentWrapper--wide"]]: layoutSize === "wide",
        })}
      >
        {children}
      </div>
      <footer className={s.layout__footer}>
        {showBack && (
          <button
            onClick={onBack}
            className={s.layout__backButton}
            type="button"
          >
            <Icon
              name="back-arrow"
              className={s.layout__backIcon}
              width={9}
              height={15}
            />
            Back
          </button>
        )}
      </footer>
      <Circle className={s.layout__circle} aria-hidden="true" />
      <Ellipse className={s.layout__ellipse1} aria-hidden="true" />
      <Ellipse className={s.layout__ellipse2} aria-hidden="true" />
    </div>
  )
}
