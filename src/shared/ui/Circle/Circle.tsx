import "./Circle.scss"

interface CircleProps {
  className?: string
}

const Circle = ({ className }: CircleProps) => {
  return <div className={`circle ${className ?? ""}`}></div>
}

export default Circle
