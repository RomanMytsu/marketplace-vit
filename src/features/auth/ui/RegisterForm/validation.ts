import { object, string } from "yup"

export const registerSchema = object({
  email: string().email().required(),

  firstName: string().min(2).required(),

  lastName: string().min(2).required(),

  password: string().min(6).required(),
})
