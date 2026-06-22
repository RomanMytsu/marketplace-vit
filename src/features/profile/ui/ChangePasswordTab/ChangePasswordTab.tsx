import { Form, Formik } from "formik"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"
import { useAppDispatch } from "@/app/store/hooks"
import type { ChangePasswordFields } from "@/entities/auth/model/types"
import { changePasswordValidationSchema } from "./changePasswordValidation"
import { changeUserPassword } from "@/entities/auth/model/authSlice"
import toast from "react-hot-toast"
import s from "./ChangePasswordTab.module.scss"

const initialValues: ChangePasswordFields = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

const ChangePasswordTab = () => {
  const dispatch = useAppDispatch()

  const handleSubmit = (
    values: ChangePasswordFields,
    { resetForm }: { resetForm: () => void },
  ) => {
    toast.promise(dispatch(changeUserPassword(values)).unwrap(), {
      loading: "Updating password...",
      success: () => {
        resetForm()
        return "Password successfully updated!"
      },
      error: (err: string) => err || "Could not update password. Try again.",
    })
  }
  return (
    <section className={s.changePassword}>
      <h2 className={s.changePassword__title}>Change Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={changePasswordValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          isSubmitting,
          isValid,
          dirty,
        }) => (
          <Form className={s.changePassword__form}>
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.currentPassword && errors.currentPassword
                  ? errors.currentPassword
                  : undefined
              }
              className={s.changePassword__input}
              labelClassName={s.changePassword__label}
            />

            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.newPassword && errors.newPassword
                  ? errors.newPassword
                  : undefined
              }
              className={s.changePassword__input}
              labelClassName={s.changePassword__label}
            />

            <Input
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : undefined
              }
              className={s.changePassword__input}
              labelClassName={s.changePassword__label}
            />

            <Button
              type="submit"
              className={`${s.changePassword__submitBtn} ${
                isValid && dirty ? s.changePassword__submitBtn_active : ""
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

export default ChangePasswordTab
