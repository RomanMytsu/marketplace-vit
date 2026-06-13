import { forwardRef, type InputHTMLAttributes } from "react"
import clsx from "clsx"
import s from "./Input.module.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  labelClassName?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, labelClassName, id, ...props }, ref) => {
    return (
      <div className={s.field__wrapper}>
        {label && (
          <label htmlFor={id} className={clsx(s.field__label, labelClassName)}>
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={clsx(
            s.field__input,
            error && s.field__inputError,
            className,
          )}
          {...props}
        />
        <span className={clsx(s.field__error, !error && s.field__error_hidden)}>
          {error}
        </span>
      </div>
    )
  },
)

Input.displayName = "Input"

export default Input
