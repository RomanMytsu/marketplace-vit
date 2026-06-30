import { getProductImageUrl } from "@/shared/lib/helpers/getImage"
import { getCategoryClass } from "@/shared/lib/helpers/categoryStyles"
import s from "./ProductVisual.module.scss"

interface ProductVisualProps {
  img: string
  name: string
  category: string
}

const ProductVisual = ({ img, name, category }: ProductVisualProps) => {
  const imgSrc = getProductImageUrl(img)
  const bgClass = getCategoryClass(category, "background")

  return (
    <div className={`${s.visual} ${bgClass}`}>
      <img
        src={imgSrc}
        alt={name}
        className={s.visual__image}
        width={608}
        height={562}
        loading="lazy"
      />
    </div>
  )
}

export default ProductVisual
