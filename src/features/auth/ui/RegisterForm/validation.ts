import { object, string } from "yup"

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
const passwordRegex =
  /^[A-Za-zА-Яа-яЁёІіЇїЄє0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+$/
const nameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'`\-\s]+$/

export const registerSchema = object({
  email: string()
    .required("Enter your email")
    .matches(emailRegex, "Enter a valid email")
    .max(50, "Max 50 characters"),

  firstName: string()
    .required("This field is required")
    .max(50, "Max 50 characters")
    .matches(nameRegex, "Letters only"),

  lastName: string()
    .required("This field is required")
    .max(50, "Max 50 characters")
    .matches(nameRegex, "Letters only"),

  password: string()
    .required("Enter your password")
    .min(6, "Minimum 6 characters")
    .max(30, "Maximum 30 characters")
    .matches(
      passwordRegex,
      "Password can contain letters, numbers, cyrillic, symbols",
    ),
})
