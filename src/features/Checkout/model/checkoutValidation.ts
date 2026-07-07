import { ObjectSchema } from "yup"
import type { CheckoutFormFields } from "./checkoutTypes"
import { profileValidationSchema } from "@/entities/profile/model/profileValidation"
import { paymentValidationSchema } from "@/entities/profile/model/paymentValidation"

export const checkoutValidationSchema = profileValidationSchema.concat(
  paymentValidationSchema,
) as ObjectSchema<CheckoutFormFields>
