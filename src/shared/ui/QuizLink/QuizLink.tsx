import { Link } from "react-router-dom"
import clsx from "clsx"
import s from "./QuizLink.module.scss"

interface QuizLinkProps {
  className?: string
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

const QuizLink = ({ variant = "primary", size = "md" }: QuizLinkProps) => {
  return (
    <Link
      className={clsx(s.quizLink, s[variant], s[size])}
      to="/quiz"
      viewTransition
    >
      Take the quiz
    </Link>
  )
}

export default QuizLink
