import type { ButtonHTMLAttributes, ReactNode } from "react"
import s from "./Button.module.scss"
import clsx from "clsx"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}
const Button = ({ children, className }: ButtonProps) => {
  return <button className={clsx(s.button, className)}>{children}</button>
}

export default Button
