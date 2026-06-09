import { object, string } from "yup"

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
const passwordRegex =
  /^[A-Za-zА-Яа-яЁёІіЇїЄє0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+$/

export const loginSchema = object({
  email: string()
    .required("Enter your email")
    .matches(emailRegex, "Enter a valid email")
    .max(50, "Max 50 characters"),
  password: string()
    .required("Enter your password")
    .min(6, "Minimum 6 characters")
    .max(30, "Maximum 30 characters")
    .matches(
      passwordRegex,
      "Password can contain letters, numbers, cyrillic, symbols",
    ),
})
