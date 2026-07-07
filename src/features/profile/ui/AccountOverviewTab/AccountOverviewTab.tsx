import type { ProfileFormFields } from "@/entities/profile/api/profileApi"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import { selectUser } from "@/entities/auth/model/selectors"
import { saveOverviewInfo } from "@/entities/profile/model/overviewSlice"
import toast from "react-hot-toast"
import { Form, Formik } from "formik"
import { profileValidationSchema } from "../../../../entities/profile/model/profileValidation"
import Button from "@/shared/ui/Button"
import { DeliveryFormFields } from "@/entities/profile/ui/DeliveryFormFields/DeliveryFormFields"
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
        saveOverviewInfo({ uid: currentUserId, fields: values }),
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
            <DeliveryFormFields
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
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
