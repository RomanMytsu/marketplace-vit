import { object, string } from "yup"
import { AsYouType, isValidPhoneNumber } from "libphonenumber-js/min"

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
const nameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'\- ]+$/

export const emailValidationRule = string()
  .required("Enter your email")
  .matches(emailRegex, "Enter a valid email")
  .max(50, "Max 50 characters")

export const nameValidationRule = string()
  .required("This field is required")
  .max(50, "Max 50 characters")
  .matches(nameRegex, "Letters only")

export const formatInternationalPhone = (value: string): string => {
  const digitsOnly = value.replace(/\D/g, "")
  let preparedValue = value

  if (digitsOnly.length > 15) {
    const truncatedDigits = digitsOnly.slice(0, 15)
    preparedValue = "+" + truncatedDigits
  } else if (preparedValue && !preparedValue.startsWith("+")) {
    preparedValue = "+" + preparedValue
  }

  const formatter = new AsYouType()
  return formatter.input(preparedValue)
}

export const profileValidationSchema = object().shape({
  firstName: nameValidationRule,
  lastName: nameValidationRule,
  addressLine1: string().max(100, "Max 100 characters"),
  addressLine2: string().max(100, "Max 100 characters"),
  city: string().required("City is required").max(50, "Max 50 characters"),
  state: string().required("State is required"),
  zipCode: string(),
  email: emailValidationRule,
  phoneNumber: string().test(
    "phone-international",
    "Enter a valid phone number with country code (e.g. +1...)",
    (value) => {
      if (!value) return true
      return isValidPhoneNumber(value)
    },
  ),
})
