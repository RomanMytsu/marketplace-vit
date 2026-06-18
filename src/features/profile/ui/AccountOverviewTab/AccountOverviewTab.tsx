import type { ProfileFormFields } from "@/entities/profile/api/profileApi"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import { selectUser } from "@/entities/auth/model/selectors"
import { saveProfileInfo } from "@/entities/profile/model/profileSlice"
import toast from "react-hot-toast"
import { Form, Formik } from "formik"
import {
  formatInternationalPhone,
  profileValidationSchema,
} from "./profileValidation"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"
import Select from "@/shared/ui/Select/Select"
import s from "./AccountOverviewTab.module.scss"

const initialValues: ProfileFormFields = {
  firstName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "NY",
  zipCode: "",
  email: "",
  phoneNumber: "",
}

const AccountOverviewTab = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectUser)

  if (!user) {
    return null
  }

  const currentUserId = user.uid

  const handleSubmit = (
    values: ProfileFormFields,
    {
      resetForm,
    }: { resetForm: (nextState?: { values: ProfileFormFields }) => void },
  ) => {
    if (!currentUserId) {
      toast.error("User ID not found. Please re-login.")
      return
    }
    toast.promise(
      dispatch(
        saveProfileInfo({ uid: currentUserId, fields: values }),
      ).unwrap(),
      {
        loading: "Saving profile changes...",
        success: () => {
          resetForm({ values })
          return "Profile successfully saved!"
        },
        error: "Could not save changes. Try again.",
      },
    )
  }

  return (
    <section className={s.overview}>
      <div className={s.overview__header}>
        <h2 className={s.overview__title}>Account Overview</h2>
        <p className={s.overview__role}>Regular customer</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={profileValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          isValid,
          dirty,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form className={s.overview__form}>
            <div className={s.overview__formWrapper}>
              <Input
                label="First Name"
                name="firstName"
                type="text"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.firstName && errors.firstName
                    ? errors.firstName
                    : undefined
                }
                labelClassName={s.overview__label}
                className={s.overview__input}
              />
              <Input
                label="Last Name"
                name="lastName"
                type="text"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.lastName && errors.lastName
                    ? errors.lastName
                    : undefined
                }
                labelClassName={s.overview__label}
                className={s.overview__input}
              />
              <Input
                label="Address Line 1"
                name="addressLine1"
                type="text"
                value={values.addressLine1}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.addressLine1 && errors.addressLine1
                    ? errors.addressLine1
                    : undefined
                }
                labelClassName={s.overview__label}
                className={s.overview__input}
              />
              <Input
                label="Address Line 2"
                name="addressLine2"
                type="text"
                value={values.addressLine2}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.addressLine2 && errors.addressLine2
                    ? errors.addressLine2
                    : undefined
                }
                labelClassName={s.overview__label}
                className={s.overview__input}
              />
              <Input
                label="City"
                name="city"
                type="text"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city && errors.city ? errors.city : undefined}
                labelClassName={s.overview__label}
                className={s.overview__input}
              />

              <div className={s.overview__inputWrapper}>
                <Select
                  label="State / Province"
                  name="state"
                  value={values.state}
                  options={[
                    { value: "NY", label: "NY" },
                    { value: "CA", label: "CA" },
                    { value: "TX", label: "TX" },
                    { value: "FL", label: "FL" },
                  ]}
                  onChange={(name, val) => setFieldValue(name, val)}
                  onBlur={(name) => setFieldTouched(name, true)}
                  error={
                    touched.state && errors.state ? errors.state : undefined
                  }
                />
                <Input
                  label="ZIP / Postal Code"
                  name="zipCode"
                  type="text"
                  value={values.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.zipCode && errors.zipCode
                      ? errors.zipCode
                      : undefined
                  }
                  className={s.overview__zipInput}
                  labelClassName={s.overview__label}
                />
              </div>
              <Input
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email ? errors.email : undefined}
                labelClassName={s.overview__label}
                className={s.overview__input}
              />
              <Input
                label="Phone Number"
                type="tel"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const formattedValue = formatInternationalPhone(
                    e.target.value,
                  )
                  setFieldValue("phoneNumber", formattedValue)
                }}
                onBlur={handleBlur}
                error={
                  touched.phoneNumber && errors.phoneNumber
                    ? errors.phoneNumber
                    : undefined
                }
                labelClassName={s.overview__label}
                className={s.overview__input}
              />
            </div>
            <Button
              type="submit"
              className={`${s.overview__submitBtn} ${isValid && dirty ? s.overview__submitBtn_active : ""}`}
              disabled={isSubmitting}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default AccountOverviewTab
