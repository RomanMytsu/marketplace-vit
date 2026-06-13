import { Formik, Form } from "formik"
import { object } from "yup"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import Input from "@/shared/ui/Input/Input"
import s from "./QuizInputStep.module.scss"
import type { QuizStepConfig } from "@/features/Quiz/model/types"
import { emailValidationRule, nameValidationRule } from "./validation"
import { setAnswer } from "@/features/Quiz/model/quizSlice"
import Icon from "@/shared/ui/Icon/Icon"
import { selectStringAnswerById } from "@/features/Quiz/model/selectors"
interface QuizInputStepProps {
  config: QuizStepConfig
  onValid: () => void
}
interface FormValues {
  value: string
}

export const QuizInputStep = ({ config, onValid }: QuizInputStepProps) => {
  const dispatch = useAppDispatch()
  const savedValue = useAppSelector((state) =>
    selectStringAnswerById(state, config.id),
  )

  const validationSchema = object({
    value:
      config.validationType === "email"
        ? emailValidationRule
        : nameValidationRule,
  })

  const initialValues: FormValues = { value: savedValue || "" }

  const handleSubmit = (values: FormValues) => {
    dispatch(setAnswer({ questionId: config.id, value: values.value.trim() }))
    onValid()
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, isValid }) => (
        <Form className={s.quizForm}>
          <Input
            id={config.id}
            name="value"
            type={config.inputType || "text"}
            label={config.inputLabel || "Value"}
            autoFocus
            value={values.value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.value ? errors.value : undefined}
            className={s.quizForm__input}
            labelClassName={s.quizForm__label}
          />
          <button
            type="submit"
            className={s.quizForm__submitCircleBtn}
            disabled={!isValid || !values.value.trim()}
          >
            <Icon
              name="back-arrow"
              className={s.quizForm__icon}
              width={9}
              height={15}
            />
          </button>
        </Form>
      )}
    </Formik>
  )
}
