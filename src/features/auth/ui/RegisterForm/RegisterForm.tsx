import { Formik, Form } from "formik"
import { createUserProfileInFirestore, registerUser } from "../../api/authApi"
import { registerSchema } from "./validation"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"
import clsx from "clsx"
import s from "./RegisterForm.module.scss"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { getAuthErrorMessage } from "@/shared/lib/helpers/getFirebaseError"
import { FirebaseError } from "firebase/app"
import { SocialButtons } from "../SocialButtons/SocialButtons"

type CustomerType = "regular" | "wholesale"

const initialValues = {
  customerType: "regular" as CustomerType,
  email: "",
  firstName: "",
  lastName: "",
  password: "",
}

const RegisterForm = () => {
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
          <div
            className={s.form__tabs}
            aria-selected={values.customerType === "regular"}
            role="tab"
          >
            <button
              type="button"
              className={clsx(
                s.form__tab,
                values.customerType === "regular" && s.form__tabActive,
              )}
              onClick={() => setFieldValue("customerType", "regular")}
            >
              Regular customer
            </button>
            <button
              type="button"
              className={clsx(
                s.form__tab,
                values.customerType === "wholesale" && s.form__tabActive,
              )}
              onClick={() => setFieldValue("customerType", "wholesale")}
            >
              Wholesale customer
            </button>
          </div>

          <h3 className={s.form__title}>Sign up with</h3>
          <SocialButtons className={s.form__socialGroup} />
          <p className={s.form__divider}>
            or sign up using your email address...
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

          <Button type="submit" className={s.form__submitBtn}>
            Create my account
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm
