import React from "react"
import type { Product } from "../../model/types"
import s from "./ProductCard.module.scss"
import { getProductImageUrl } from "../../lib/getImage"
import { getCategoryClass } from "../../lib/categoryStyles"

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imgSrc = getProductImageUrl(product.img)
  const bgClass = getCategoryClass(product.category, "background")

  return (
    <div className={`${s.card || ""} ${bgClass}`}>
      <div className={s.imageWrapper}>
        <img src={imgSrc} alt={product.name} className={s.image} />
      </div>
      <div className={s.info}>
        <span className={s.category}>{product.category}</span>
        <h3 className={s.name}>{product.name}</h3>
        <p className={s.title}>{product.title}</p>
      </div>
    </div>
  )
}

export default ProductCard
