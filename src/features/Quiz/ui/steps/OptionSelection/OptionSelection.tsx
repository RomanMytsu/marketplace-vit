import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import type { QuizStepConfig } from "@/features/Quiz/model/types"
import { setAnswer } from "@/features/Quiz/model/quizSlice"
import s from "./OptionSelection.module.scss"
import clsx from "clsx"

interface OptionSelectionProps {
  config: QuizStepConfig
  onAutoSubmit?: () => void
}

export const OptionSelection = ({
  config,
  onAutoSubmit,
}: OptionSelectionProps) => {
  const dispatch = useAppDispatch()
  const currentAnswer = useAppSelector((state) => state.quiz.answers[config.id])

  const handleSelect = (value: string) => {
    if (config.type === "single") {
      dispatch(setAnswer({ questionId: config.id, value }))
      if (onAutoSubmit) {
        setTimeout(onAutoSubmit, 300)
      }
    } else {
      const activeAnswers = Array.isArray(currentAnswer)
        ? [...currentAnswer]
        : []
      const newValue = activeAnswers.includes(value)
        ? activeAnswers.filter((item) => item !== value)
        : [...activeAnswers, value]

      dispatch(setAnswer({ questionId: config.id, value: newValue }))
    }
  }

  const isSelected = (value: string) => {
    if (!currentAnswer) return false
    return Array.isArray(currentAnswer)
      ? currentAnswer.includes(value)
      : currentAnswer === value
  }

  return (
    <div
      className={clsx(s.optionSelection, {
        [s["optionSelection--grid"]]: config.layout === "grid",
      })}
    >
      {config.options?.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleSelect(option.value)}
          className={clsx(s.optionSelection__optionCard, {
            [s.optionSelection__selectedCard]: isSelected(option.value),
          })}
        >
          <span className={s.optionSelection__optionLabel}>{option.label}</span>
        </button>
      ))}
    </div>
  )
}
