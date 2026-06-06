import type { ButtonHTMLAttributes, ReactNode } from "react"
import s from "./Button.module.scss"
import clsx from "clsx"
type ButtonVariant = "primary" | "secondary"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  fullWidth?: boolean
}
const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        s.button,
        s[variant],
        fullWidth && s.fullWidth,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
