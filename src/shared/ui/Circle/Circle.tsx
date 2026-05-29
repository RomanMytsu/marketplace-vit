import clsx from "clsx"
import s from "./Circle.module.scss"

interface CircleProps {
  className?: string
}

const Circle = ({ className }: CircleProps) => {
  return <div className={clsx(s.circle, className)}></div>
}

export default Circle
