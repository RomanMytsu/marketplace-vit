import { object, ref, string } from "yup"

export const changePasswordValidationSchema = object({
  currentPassword: string().required("Current password is required"),
  newPassword: string()
    .min(6, "Password must be at least 6 characters")
    .notOneOf(
      [ref("currentPassword")],
      "New password cannot be the same as the old password",
    )
    .required("New password is required"),
  confirmPassword: string()
    .oneOf([ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),
})
