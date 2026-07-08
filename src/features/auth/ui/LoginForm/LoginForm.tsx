import { Formik, Form } from "formik"
import { loginSchema } from "./validation"
import { loginUser } from "../../api/authApi"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"
import s from "./LoginForm.module.scss"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { getAuthErrorMessage } from "@/shared/lib/helpers/getFirebaseError"
import { SocialButtons } from "../SocialButtons/SocialButtons"

type FirebaseLikeError = { code: string }

type LoginFormValues = { email: string; password: string }
const initialValues: LoginFormValues = { email: "", password: "" }

const LoginForm = () => {
  const navigate = useNavigate()

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await loginUser(values.email, values.password)
      toast.success("You have successfully logged in!")
      navigate("/")
    } catch (error) {
      if (error && typeof error === "object" && "code" in error) {
        const firebaseError = error as FirebaseLikeError
        toast.error(getAuthErrorMessage(firebaseError.code))
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
        <Form className={s.loginForm}>
          <h3 className={s.loginForm__title}>Sign in with email</h3>
          <p className={s.loginForm__subtitle}>
            Please enter your e-mail and password:
          </p>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : undefined}
          />
          <div className={s.loginForm__passwordWrapper}>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password ? errors.password : undefined}
            />
            <Link
              to="/forgot-password"
              className={s.loginForm__forgotLink}
              viewTransition
            >
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className={s.loginForm__btnSubmit}>
            Sign In
          </Button>
          <div className={s.loginForm__divider}>or sign in with...</div>
          <SocialButtons />
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
