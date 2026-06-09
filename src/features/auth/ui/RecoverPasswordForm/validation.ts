import { object, string } from "yup"

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i

export const recoverySchema = object({
  email: string()
    .required("Enter your email")
    .matches(emailRegex, "Enter a valid email")
    .max(50, "Max 50 characters"),
})
