import React from "react"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import s from "./OptionSelection.module.scss"
import type { QuizStepConfig } from "@/features/Quiz/model/types"
import { setAnswer } from "@/features/Quiz/model/quizSlice"

interface OptionSelectionProps {
  config: QuizStepConfig
  onAutoSubmit?: () => void
}

export const OptionSelection: React.FC<OptionSelectionProps> = ({
  config,
  onAutoSubmit,
}) => {
  const dispatch = useAppDispatch()
  const currentAnswer = useAppSelector((state) => state.quiz.answers[config.id])

  const handleSelect = (value: string) => {
    if (config.type === "single") {
      dispatch(setAnswer({ questionId: config.id, value }))
      // Если это single-choice, можно автоматически переводить на следующий шаг
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
    <div className={s.optionsStack}>
      {config.options?.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleSelect(option.value)}
          className={`${s.optionCard} ${isSelected(option.value) ? s.selectedCard : ""}`}
        >
          <div className={s.optionContent}>
            <span className={s.optionLabel}>{option.label}</span>
          </div>
        </button>
      ))}
    </div>
  )
}
