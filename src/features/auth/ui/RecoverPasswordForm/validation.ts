import { object, string } from "yup"

export const recoverySchema = object({
  email: string().email("Invalid email").required("Required"),
})
