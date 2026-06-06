import { Formik, Form } from "formik"
import { useAppDispatch } from "@/app/store/hooks"
import { closeAuthModal, setAuthView } from "../../model/authModalSlice"
import { loginSchema } from "./validation"
import { loginUser } from "../../api/authApi"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"
import s from "./LoginForm.module.scss"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { getAuthErrorMessage } from "@/shared/lib/helpers/getFirebaseError"
import { FirebaseError } from "firebase/app"

type LoginFormValues = { email: string; password: string }
const initialValues: LoginFormValues = { email: "", password: "" }

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await loginUser(values.email, values.password)
      toast.success("You have successfully logged in!")
      dispatch(closeAuthModal())
      navigate("/")
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(getAuthErrorMessage(error.code))
      } else {
        toast.error("An unexpected error has occurred. Please try again later.")
      }
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className={s.form}>
          <h3 className={s.title}>Sign in with email</h3>
          <p className={s.subtitle}>Please enter your e-mail and password:</p>

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : undefined}
          />

          <div className={s.passwordWrapper}>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password ? errors.password : undefined}
            />
            <button
              type="button"
              className={s.forgotLink}
              onClick={() => dispatch(setAuthView("recovery"))}
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" fullWidth>
            Sign In
          </Button>

          <div className={s.divider}>or sign in with...</div>
          {/* Компоненты социальных кнопок */}

          <div className={s.footer}>
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => dispatch(setAuthView("register"))}
            >
              Create one
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
