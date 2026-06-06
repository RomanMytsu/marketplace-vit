import { forwardRef, type InputHTMLAttributes } from "react"

import clsx from "clsx"

import s from "./Input.module.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={s.wrapper}>
        {label && <label className={s.label}>{label}</label>}

        <input
          ref={ref}
          className={clsx(s.input, error && s.inputError, className)}
          {...props}
        />

        {error && <span className={s.error}>{error}</span>}
      </div>
    )
  },
)

Input.displayName = "Input"

export default Input
