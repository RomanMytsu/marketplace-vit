import type { ProfileFormFields } from "@/entities/profile/api/profileApi"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import { selectUser } from "@/entities/auth/model/selectors"
import { saveProfileInfo } from "@/entities/profile/model/profileSlice"
import toast from "react-hot-toast"
import { Form, Formik } from "formik"
import { profileValidationSchema } from "./profileValidation"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"
import Icon from "@/shared/ui/Icon/Icon"
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
    { resetForm }: { resetForm: () => void },
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
          resetForm()
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
              />
              <Input
                label="City"
                name="city"
                type="text"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city && errors.city ? errors.city : undefined}
              />
              <div className={s.overview__inputWrapper}>
                <div className={s.overview__selectWrapper}>
                  <label className={s.overview__selectLabel} htmlFor="state">
                    State / Province
                  </label>
                  <div className={s.overview__selectContainer}>
                    <select
                      id="state"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={s.overview__selectInput}
                    >
                      <option value="NY">NY</option>
                      <option value="CA">CA</option>
                      <option value="TX">TX</option>
                      <option value="FL">FL</option>
                    </select>
                    <Icon
                      name="select_arrow"
                      className={s.overview__selectIcon}
                      width={15}
                      height={9}
                    />
                  </div>
                </div>
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
              />
              <Input
                label="Phone Number"
                type="tel"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.phoneNumber && errors.phoneNumber
                    ? errors.phoneNumber
                    : undefined
                }
              />
            </div>
            <Button
              type="submit"
              className={s.overview__submitBtn}
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
