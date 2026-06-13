import { useNavigate } from "react-router-dom"
import { useTitle } from "@/shared/lib/hooks/useTitle"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import { nextStep, prevStep } from "@/features/Quiz/model/quizSlice"
import { QuizStepLayout } from "@/features/Quiz/ui/steps/QuizStepLayout/QuizStepLayout"
import { QuizInputStep } from "@/features/Quiz/ui/steps/QuizInputStep/QuizInputStep"
import { OptionSelection } from "@/features/Quiz/ui/steps/OptionSelection/OptionSelection"
import {
  selectCurrentStepConfig,
  selectCurrentStepIdx,
  selectIsLastStep,
  selectTotalSteps,
} from "@/features/Quiz/model/selectors"
import s from "./QuizPage.module.scss"

const QuizPage = () => {
  useTitle("Quiz")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const currentStepIdx = useAppSelector(selectCurrentStepIdx)
  const currentStepConfig = useAppSelector(selectCurrentStepConfig)
  const isLastStep = useAppSelector(selectIsLastStep)
  const totalSteps = selectTotalSteps()

  if (!currentStepConfig) return null

  const handleNext = () => {
    if (isLastStep) {
      navigate("/personal-pack")
    } else {
      dispatch(nextStep())
    }
  }

  return (
    <div className={s.quizPageWrapper}>
      <QuizStepLayout
        title={currentStepConfig.title}
        currentStep={currentStepIdx + 1}
        totalSteps={totalSteps}
        showBack={currentStepIdx > 0}
        onBack={() => dispatch(prevStep())}
        layoutSize={currentStepConfig.layoutSize}
      >
        {currentStepConfig.type === "intro" ||
        currentStepConfig.type === "email" ? (
          <QuizInputStep
            key={currentStepConfig.id}
            config={currentStepConfig}
            onValid={handleNext}
          />
        ) : (
          <OptionSelection
            config={currentStepConfig}
            onAutoSubmit={handleNext}
            variant={currentStepConfig.optionVariant}
          />
        )}
      </QuizStepLayout>
    </div>
  )
}

export default QuizPage
