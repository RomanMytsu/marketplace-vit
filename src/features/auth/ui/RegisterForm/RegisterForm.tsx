import { Formik, Form } from "formik"
import { useAppDispatch } from "@/app/store/hooks"
import { closeAuthModal, setAuthView } from "../../model/authModalSlice"
import { createUserProfileInFirestore, registerUser } from "../../api/authApi"
import { registerSchema } from "./validation"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"
import clsx from "clsx"
import s from "./RegisterForm.module.scss" // Стили для табов
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { getAuthErrorMessage } from "@/shared/lib/helpers/getFirebaseError"
import { FirebaseError } from "firebase/app"

type CustomerType = "regular" | "wholesale"

const initialValues = {
  customerType: "regular" as CustomerType,
  email: "",
  firstName: "",
  lastName: "",
  password: "",
}

const RegisterForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const userCredential = await registerUser(values.email, values.password)
      await createUserProfileInFirestore(userCredential.user.uid, {
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.customerType,
      })
      toast.success("Your account has been successfully created!")
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
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Form className={s.form}>
          {/* Переключатель типа клиента */}
          <div className={s.tabs}>
            <button
              type="button"
              className={clsx(
                s.tab,
                values.customerType === "regular" && s.tabActive,
              )}
              onClick={() => setFieldValue("customerType", "regular")}
            >
              Regular customer
            </button>
            <button
              type="button"
              className={clsx(
                s.tab,
                values.customerType === "wholesale" && s.tabActive,
              )}
              onClick={() => setFieldValue("customerType", "wholesale")}
            >
              Wholesale customer
            </button>
          </div>

          <h3 className={s.title}>Sign up with</h3>
          {/* Здесь будут ваши кнопки Social Auth (Google, Apple, Facebook) */}

          <div className={s.divider}>
            or sign up using your email address...
          </div>

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : undefined}
          />

          <Input
            name="firstName"
            placeholder="First Name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.firstName ? errors.firstName : undefined}
          />

          <Input
            name="lastName"
            placeholder="Last Name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.lastName ? errors.lastName : undefined}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password ? errors.password : undefined}
          />

          <Button type="submit" fullWidth>
            Create my account
          </Button>

          <div className={s.footer}>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => dispatch(setAuthView("login"))}
            >
              Sign in
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm
