import { object, string } from "yup"
import cardValidator from "card-validator"

export const paymentValidationSchema = object().shape({
  cardNumber: string()
    .required("Card number is required")
    .test("test-number", "Card number is invalid", (value) => {
      if (!value) return false
      return cardValidator.number(value).isValid
    }),
  expiration: string()
    .required("Expiration date is required")
    .test("test-expiration", "Expiration date is invalid", (value) => {
      if (!value) return false
      return cardValidator.expirationDate(value).isValid
    }),
  cvc: string()
    .required("CVC is required")
    .test("test-cvc", "CVC is invalid", (value) => {
      if (!value) return false
      return cardValidator.cvv(value).isValid
    }),
})

export const formatCardNumber = (value: string): string => {
  const clearValue = value.replace(/\D/g, "")
  const validation = cardValidator.number(clearValue)

  const gaps = validation.card?.gaps ?? [4, 8, 12, 16]

  const parts: string[] = []
  let position = 0

  for (let i = 0; i < gaps.length; i++) {
    const end = gaps[i]
    if (clearValue.length >= end) {
      parts.push(clearValue.slice(position, end))
      position = end
    } else {
      break
    }
  }
  parts.push(clearValue.slice(position))

  return parts
    .filter(Boolean)
    .join(" ")
    .slice(0, (validation.card?.lengths[0] ?? 16) + gaps.length)
}

export const formatExpiration = (value: string): string => {
  const clearValue = value.replace(/\D/g, "").slice(0, 4)
  if (clearValue.length >= 2) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2)}`
  }
  return clearValue
}

export const formatCVC = (value: string, cardNumber: string): string => {
  const clearValue = value.replace(/\D/g, "")
  const cardValidation = cardValidator.number(cardNumber)
  const maxCvcLength = cardValidation.card?.code.size ?? 3
  return clearValue.slice(0, maxCvcLength)
}
