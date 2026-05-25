type IconProps = {
  name: string
  width?: number
  height?: number
  className?: string
}

const Icon = ({ name, width, height, className }: IconProps) => {
  return (
    <svg className={className} width={width} height={height} aria-hidden="true">
      <use href={`#icon-${name}`}></use>
    </svg>
  )
}

export default Icon
