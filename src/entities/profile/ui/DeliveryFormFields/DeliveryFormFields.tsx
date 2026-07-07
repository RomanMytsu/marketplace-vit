import type { FormikErrors, FormikTouched } from "formik"
import type { ProfileFormFields } from "../../api/profileApi"
import Input from "@/shared/ui/Input"
import Select from "@/shared/ui/Select/Select"
import { formatInternationalPhone } from "@/entities/profile/model/profileValidation"
import s from "./DeliveryFormFields.module.scss"

interface DeliveryFormFieldsProps {
  values: ProfileFormFields
  errors: FormikErrors<ProfileFormFields>
  touched: FormikTouched<ProfileFormFields>
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  handleBlur: React.FocusEventHandler<HTMLInputElement>
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean,
  ) => void
  setFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean,
  ) => void
}

export const DeliveryFormFields = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  setFieldTouched,
}: DeliveryFormFieldsProps) => {
  return (
    <div className={s.deliveryForm}>
      <Input
        label="First Name"
        name="firstName"
        type="text"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.firstName && errors.firstName ? errors.firstName : undefined
        }
        labelClassName={s.deliveryForm__label}
        className={s.deliveryForm__input}
      />
      <Input
        label="Last Name"
        name="lastName"
        type="text"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.lastName && errors.lastName ? errors.lastName : undefined
        }
        labelClassName={s.deliveryForm__label}
        className={s.deliveryForm__input}
      />
      <Input
        label="Address Line 1"
        name="addressLine1"
        type="text"
        value={values.addressLine1}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.addressLine1 && errors.addressLine1
            ? errors.addressLine1
            : undefined
        }
        labelClassName={s.deliveryForm__label}
        className={s.deliveryForm__input}
      />
      <Input
        label="Address Line 2"
        name="addressLine2"
        type="text"
        value={values.addressLine2}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.addressLine2 && errors.addressLine2
            ? errors.addressLine2
            : undefined
        }
        labelClassName={s.deliveryForm__label}
        className={s.deliveryForm__input}
      />
      <Input
        label="City"
        name="city"
        type="text"
        value={values.city}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.city && errors.city ? errors.city : undefined}
        labelClassName={s.deliveryForm__label}
        className={s.deliveryForm__input}
      />

      <div className={s.deliveryForm__inputWrapper}>
        <Select
          label="State / Province"
          name="state"
          value={values.state}
          options={[
            { value: "NY", label: "NY" },
            { value: "CA", label: "CA" },
            { value: "TX", label: "TX" },
            { value: "FL", label: "FL" },
          ]}
          onChange={(name, val) => setFieldValue(name, val)}
          onBlur={(name) => setFieldTouched(name, true)}
          error={touched.state && errors.state ? errors.state : undefined}
        />
        <Input
          label="ZIP / Postal Code"
          name="zipCode"
          type="text"
          value={values.zipCode}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.zipCode && errors.zipCode ? errors.zipCode : undefined}
          className={s.deliveryForm__zipInput}
          labelClassName={s.deliveryForm__label}
        />
      </div>
      <Input
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && errors.email ? errors.email : undefined}
        labelClassName={s.deliveryForm__label}
        className={s.deliveryForm__input}
      />
      <Input
        label="Phone Number"
        type="tel"
        name="phoneNumber"
        value={values.phoneNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const formattedValue = formatInternationalPhone(e.target.value)
          setFieldValue("phoneNumber", formattedValue)
        }}
        onBlur={handleBlur}
        error={
          touched.phoneNumber && errors.phoneNumber
            ? errors.phoneNumber
            : undefined
        }
        labelClassName={s.deliveryForm__label}
        className={s.deliveryForm__input}
      />
    </div>
  )
}
