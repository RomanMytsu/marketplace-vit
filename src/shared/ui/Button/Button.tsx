import type { ButtonHTMLAttributes, ReactNode } from "react"
import clsx from "clsx"
import s from "./Button.module.scss"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}
const Button = ({
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button type={type} className={clsx(s.button, className)} {...props}>
      {children}
    </button>
  )
}

export default Button
