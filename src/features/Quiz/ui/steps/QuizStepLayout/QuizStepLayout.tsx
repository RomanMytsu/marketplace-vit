import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import logoWhite from "@/shared/assets/images/white-logo.svg"
import s from "./QuizStepLayout.module.scss"
import Icon from "@/shared/ui/Icon/Icon"

interface QuizStepLayoutProps {
  title: string
  currentStep: number
  totalSteps: number
  showBack: boolean
  onBack: () => void
  children: ReactNode
}

export const QuizStepLayout = ({
  title,
  currentStep,
  totalSteps,
  showBack,
  onBack,
  children,
}: QuizStepLayoutProps) => {
  return (
    <div className={s.layout}>
      <div className={s.layout__leftPanel}>
        <div className={s.layout__header}>
          <Link to="/">
            <img
              src={logoWhite}
              alt="Logo Image"
              width={42}
              height={50}
              loading="lazy"
            />
          </Link>
        </div>
        <h1 className={s.layout__mainTitle}>{title}</h1>
        {showBack && (
          <button
            onClick={onBack}
            className={s.layout__backButton}
            type="button"
          >
            <Icon name="back-arrow" width={9} height={15} />
            Back
          </button>
        )}
      </div>
      <div className={s.layout__rightPanel}>
        <div className={s.layout__stepCounter}>
          {currentStep}/{totalSteps}
        </div>
        <div className={s.layout__contentWrapper}>{children}</div>
      </div>
    </div>
  )
}
