import { Form, Formik } from "formik"
import toast from "react-hot-toast"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import { selectUser } from "@/entities/auth/model/selectors"
import type { PaymentFormFields } from "@/entities/profile/api/profileApi"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"
import {
  paymentValidationSchema,
  formatCardNumber,
  formatExpiration,
  formatCVC,
} from "./paymentValidation"
import { savePaymentInfo } from "@/entities/profile/model/paymentSlice"
import srcImg from "@/shared/assets/images/payment-card.webp"
import s from "./PaymentMethodsTab.module.scss"

const initialValues: PaymentFormFields = {
  cardNumber: "",
  expiration: "",
  cvc: "",
}

const PaymentMethodsTab = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  if (!user) {
    return null
  }

  const currentUserId = user.uid

  const handleSubmit = (
    values: PaymentFormFields,
    {
      resetForm,
    }: { resetForm: (nextState?: { values: PaymentFormFields }) => void },
  ) => {
    if (!currentUserId) {
      toast.error("User ID not found. Please re-login.")
      return
    }

    const cardData = {
      cardNumber: values.cardNumber,
      expiration: values.expiration,
    }

    toast.promise(
      dispatch(
        savePaymentInfo({ uid: currentUserId, fields: cardData }),
      ).unwrap(),
      {
        loading: "Saving payment method...",
        success: () => {
          resetForm({ values })
          return "Payment method successfully updated!"
        },
        error: "Could not save payment info. Try again.",
      },
    )
  }

  return (
    <section className={s.payment}>
      <h2 className={s.payment__title}>Payment methods</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={paymentValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          isSubmitting,
          isValid,
          dirty,
          setFieldValue,
        }) => (
          <Form className={s.payment__form}>
            <div className={s.payment__cardsVisual}>
              <img
                src={srcImg}
                alt="Image cart"
                className={s.payment__img}
                width={674}
                height={336}
                loading="lazy"
              />
              <div className={s.payment__frontCard}>
                <Input
                  label="Card Number"
                  name="cardNumber"
                  type="text"
                  placeholder="6477 1693 3042 6031"
                  value={values.cardNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue(
                      "cardNumber",
                      formatCardNumber(e.target.value),
                    )
                  }}
                  onBlur={handleBlur}
                  error={
                    touched.cardNumber && errors.cardNumber
                      ? errors.cardNumber
                      : undefined
                  }
                  className={s.payment__input}
                  labelClassName={s.payment__label}
                />

                <div className={s.payment__row}>
                  <Input
                    label="Expiration"
                    name="expiration"
                    type="text"
                    placeholder="12/21"
                    value={values.expiration}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue(
                        "expiration",
                        formatExpiration(e.target.value),
                      )
                    }}
                    onBlur={handleBlur}
                    error={
                      touched.expiration && errors.expiration
                        ? errors.expiration
                        : undefined
                    }
                    className={s.payment__input_short}
                    labelClassName={s.payment__label}
                  />
                </div>
              </div>
              <div className={s.payment__backCard}>
                <div className={s.payment__cvcWrapper}>
                  <Input
                    label="CVC"
                    name="cvc"
                    type="password"
                    placeholder="***"
                    value={values.cvc}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue(
                        "cvc",
                        formatCVC(e.target.value, values.cardNumber),
                      )
                    }}
                    onBlur={handleBlur}
                    error={touched.cvc && errors.cvc ? errors.cvc : undefined}
                    className={s.payment__input_cvc}
                    labelClassName={s.payment__label}
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className={`${s.payment__submitBtn} ${
                isValid && dirty ? s.payment__submitBtn_active : ""
              }`}
              disabled={!isValid || !dirty || isSubmitting}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default PaymentMethodsTab
