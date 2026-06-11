import { string } from "yup"

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
const nameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'`\-\s]+$/

export const emailValidationRule = string()
  .required("Enter your email")
  .matches(emailRegex, "Enter a valid email")
  .max(50, "Max 50 characters")

export const nameValidationRule = string()
  .required("This field is required")
  .max(50, "Max 50 characters")
  .matches(nameRegex, "Letters only")
