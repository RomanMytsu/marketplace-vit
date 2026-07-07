import { Form, Formik } from "formik"
import { DeliveryFormFields } from "@/entities/profile/ui/DeliveryFormFields/DeliveryFormFields"
import Input from "@/shared/ui/Input"
import {
  checkoutInitialValues,
  type CheckoutFormFields,
} from "../../model/checkoutTypes"
import { checkoutValidationSchema } from "../../model/checkoutValidation"
import {
  formatCardNumber,
  formatCVC,
  formatExpiration,
} from "@/entities/profile/model/paymentValidation"
import { CheckoutSummary } from "../CheckoutSummary/CheckoutSummary"
import Button from "@/shared/ui/Button"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import { useNavigate } from "react-router-dom"
import { selectUser } from "@/entities/auth/model/selectors"
import { placeOrder } from "../../model/checkoutSlice"
import s from "./CheckoutForm.module.scss"

export const CheckoutForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)

  const handleCheckoutSubmit = async (
    values: CheckoutFormFields,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (!user) {
      alert("Please log in to complete your purchase")
      return
    }

    const resultAction = await dispatch(placeOrder(values))

    if (placeOrder.fulfilled.match(resultAction)) {
      navigate("/checkout/success")
    } else {
      alert(resultAction.payload || "Failed to place order. Try again.")
    }

    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={checkoutInitialValues}
      validationSchema={checkoutValidationSchema}
      onSubmit={handleCheckoutSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        dirty,
        isValid,
        isSubmitting,
      }) => (
        <Form>
          <div className={s.checkoutLayout}>
            <div className={s.checkoutLayout__formSide}>
              <h2 className={s.checkoutLayout__title}>Delivery Information</h2>
              <DeliveryFormFields
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
              <h2 className={s.checkoutLayout__title}>Billing</h2>
              <div className={s.checkoutLayout__billingGrid}>
                <Input
                  label="Card Number"
                  name="cardNumber"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={values.cardNumber}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value)
                    setFieldValue("cardNumber", formatted)
                  }}
                  onBlur={handleBlur}
                  error={
                    touched.cardNumber && errors.cardNumber
                      ? errors.cardNumber
                      : undefined
                  }
                  labelClassName={s.checkoutLayout__label}
                />
                <div className={s.checkoutLayout__inputWrapper}>
                  <Input
                    label="Expiration"
                    name="expiration"
                    placeholder="MM/YY"
                    value={values.expiration}
                    onChange={(e) => {
                      const formatted = formatExpiration(e.target.value)
                      setFieldValue("expiration", formatted)
                    }}
                    onBlur={handleBlur}
                    error={
                      touched.expiration && errors.expiration
                        ? errors.expiration
                        : undefined
                    }
                    labelClassName={s.checkoutLayout__label}
                    className={s.checkoutLayout__input}
                  />
                  <Input
                    label="CVC"
                    name="cvc"
                    placeholder="CVC"
                    value={values.cvc}
                    onChange={(e) => {
                      const formatted = formatCVC(
                        e.target.value,
                        values.cardNumber,
                      )
                      setFieldValue("cvc", formatted)
                    }}
                    onBlur={handleBlur}
                    error={touched.cvc && errors.cvc ? errors.cvc : undefined}
                    labelClassName={s.checkoutLayout__label}
                    className={s.checkoutLayout__input}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className={s.checkoutLayout__mobileSubmitBtn}
                disabled={!isValid || !dirty || isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Place order"}
              </Button>
            </div>
            <div className={s.checkoutLayout__summarySide}>
              <CheckoutSummary />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
