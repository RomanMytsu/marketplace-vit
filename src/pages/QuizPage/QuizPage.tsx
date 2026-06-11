import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import { useNavigate } from "react-router-dom"
import { QUIZ_STEPS } from "@/features/Quiz/config/quizSteps"
import { nextStep, prevStep } from "@/features/Quiz/model/quizSlice"
import s from "./QuizPage.module.scss"
import { QuizStepLayout } from "@/features/Quiz/ui/steps/QuizStepLayout/QuizStepLayout"
import { QuizInputStep } from "@/features/Quiz/ui/steps/QuizInputStep/QuizInputStep"
import { OptionSelection } from "@/features/Quiz/ui/steps/OptionSelection/OptionSelection"

const QuizPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const currentStepIdx = useAppSelector((state) => state.quiz.currentStep)

  const currentStepConfig = QUIZ_STEPS[currentStepIdx]

  if (!currentStepConfig) return null

  const isLastStep = currentStepIdx === QUIZ_STEPS.length - 1

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
        totalSteps={QUIZ_STEPS.length}
        showBack={currentStepIdx > 0}
        onBack={() => dispatch(prevStep())}
      >
        {currentStepConfig.type === "intro" ||
        currentStepConfig.type === "email" ? (
          <QuizInputStep
            key={currentStepConfig.id} // Ключ сбросит состояние Formik между 1 и 9 шагом
            config={currentStepConfig}
            onValid={handleNext}
          />
        ) : (
          <OptionSelection
            config={currentStepConfig}
            onAutoSubmit={handleNext}
          />
        )}
      </QuizStepLayout>
    </div>
  )
}

export default QuizPage
