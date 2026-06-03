import React from "react"
import type { Product } from "../../model/types"
import s from "./ProductCard.module.scss"
import { getProductImageUrl } from "../../lib/getImage"
import { getCategoryClass } from "../../lib/categoryStyles"

interface ProductCardProps {
  product: Product
  variant?: "slider" | "catalog"
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = "slider",
}) => {
  const imgSrc = getProductImageUrl(product.img)
  const bgClass = getCategoryClass(product.category, "background")
  const textClass = getCategoryClass(product.category, "text")

  const cardClasses = [
    s.card,
    variant === "slider"
      ? `${s["card--slider"]} ${bgClass}`
      : s["card--catalog"],
  ].join(" ")

  const formatPrice = (value?: number) => {
    if (value === undefined) return ""
    return `$${value.toFixed(2)}`
  }

  return (
    <article className={cardClasses}>
      <div className={s.card__imageWrapper}>
        <img src={imgSrc} alt={product.name} className={s.card__image} />
        {variant === "catalog" && product.oldPrice && product.price && (
          <span className={s.card__discountBadge}>
            -
            {Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100,
            )}
            %
          </span>
        )}
      </div>
      <div className={s.card__info}>
        <span
          className={`${s.card__category} ${variant === "catalog" ? textClass : ""}`}
        >
          {product.category}
        </span>
        <h3 className={s.card__name}>{product.name}</h3>
        {variant === "slider" && product.title && (
          <p className={s.card__title}>{product.title}</p>
        )}
        {variant === "catalog" && product.price && (
          <div className={s.card__priceBlock}>
            {product.oldPrice ? (
              <>
                <span className={s.card__oldPrice}>
                  {formatPrice(product.oldPrice)}
                </span>
                <span className={s.card__currentPriceWithDiscount}>
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className={s.card__defaultPrice}>
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default ProductCard
