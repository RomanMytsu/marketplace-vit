import { Formik, Form } from "formik"
import { object } from "yup"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import Input from "@/shared/ui/Input/Input"
import s from "./QuizInputStep.module.scss"
import type { QuizStepConfig } from "@/features/Quiz/model/types"
import { emailValidationRule, nameValidationRule } from "./validation"
import { setAnswer } from "@/features/Quiz/model/quizSlice"

interface QuizInputStepProps {
  config: QuizStepConfig
  onValid: () => void
}

interface FormValues {
  value: string
}

export const QuizInputStep = ({ config, onValid }: QuizInputStepProps) => {
  const dispatch = useAppDispatch()
  const savedValue = useAppSelector(
    (state) => state.quiz.answers[config.id],
  ) as string | undefined

  const isEmail = config.id === "email"

  // Формируем динамическую схему, где ключом всегда является 'value'
  const validationSchema = object({
    value: isEmail ? emailValidationRule : nameValidationRule,
  })

  const initialValues: FormValues = {
    value: savedValue || "",
  }

  const handleSubmit = (values: FormValues) => {
    dispatch(setAnswer({ questionId: config.id, value: values.value.trim() }))
    onValid()
  }

  const inputLabel = isEmail ? "Email" : "First Name"
  const inputPlaceholder = isEmail ? "alex@example.com" : "Alex"
  const inputType = isEmail ? "email" : "text"

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, isValid }) => (
        <Form className={s.introForm}>
          <Input
            id={config.id}
            name="value"
            type={inputType}
            label={inputLabel}
            placeholder={inputPlaceholder}
            autoFocus
            value={values.value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.value ? errors.value : undefined}
          />
          <button
            type="submit"
            className={s.submitCircleBtn}
            disabled={!isValid || !values.value.trim()}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5L16 12L9 19"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Form>
      )}
    </Formik>
  )
}
