import clsx from "clsx"
import s from "./Ellipse.module.scss"

interface EllipseProps {
  className?: string
}

const Ellipse = ({ className }: EllipseProps) => {
  return <div className={clsx(s.ellipse, className)}></div>
}

export default Ellipse
