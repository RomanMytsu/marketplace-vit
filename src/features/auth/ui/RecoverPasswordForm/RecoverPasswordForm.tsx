import { Formik, Form } from "formik"
import { recoverPassword } from "../../api/authApi"
import { recoverySchema } from "./validation"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"
import s from "./RecoverPasswordForm.module.scss"
import toast from "react-hot-toast"
import { getAuthErrorMessage } from "@/shared/lib/helpers/getFirebaseError"
import { FirebaseError } from "firebase/app"
import { Link } from "react-router-dom"

const initialValues = { email: "" }

const RecoverPasswordForm = () => {
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await recoverPassword(values.email)
      toast.success("The recovery instructions have been sent to your email!")
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(getAuthErrorMessage(error.code))
      } else {
        toast.error("An unexpected error occurred. Please try again.")
      }
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={recoverySchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className={s.form}>
          <h3 className={s.title}>Recover password</h3>
          <p className={s.subtitle}>Please enter your email:</p>

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : undefined}
          />

          <Button type="submit">Recover</Button>

          <div className={s.footer}>
            Remember your password? <Link to="/login">Back to login</Link>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default RecoverPasswordForm
