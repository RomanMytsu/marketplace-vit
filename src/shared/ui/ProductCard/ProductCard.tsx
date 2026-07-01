import type { Product } from "../../../entities/products/model/types"
import { getProductImageUrl } from "../../lib/helpers/getImage"
import { getCategoryClass } from "../../lib/helpers/categoryStyles"
interface ProductCardProps {
  product: Product
  variant?: "slider" | "catalog" | "pack"
}
import s from "./ProductCard.module.scss"
import { Link } from "react-router-dom"

const ProductCard = ({ product, variant = "slider" }: ProductCardProps) => {
  const imgSrc = getProductImageUrl(product.img)
  const bgClass = getCategoryClass(product.category, "background")
  const textClass = getCategoryClass(product.category, "text")

  const isSlider = variant === "slider"
  const isCatalog = variant === "catalog"
  const isPack = variant === "pack"

  const showFullInfo = isCatalog || isPack

  const cardClasses = [
    s.card,
    isSlider && `${s["card--slider"]} ${bgClass}`,
    isCatalog && s["card--catalog"],
    isPack && s["card--pack"],
  ]
    .filter(Boolean)
    .join(" ")

  const formatPrice = (value?: number) => {
    if (value === undefined) return ""
    return `$${value.toFixed(2)}`
  }

  return (
    <article className={cardClasses}>
      <Link
        to={`/catalog/${product.id}`}
        className={s.card__link}
        viewTransition
      >
        <div className={s.card__imageWrapper}>
          <img src={imgSrc} alt={product.name} className={s.card__image} />
          {showFullInfo && product.oldPrice && product.price && (
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
            className={`${s.card__category} ${showFullInfo ? textClass : ""}`}
          >
            {product.category}
          </span>
          <p className={s.card__name}>{product.name}</p>
          {isSlider && product.title && (
            <p className={s.card__title}>{product.title}</p>
          )}
          {showFullInfo && product.price && (
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
      </Link>
    </article>
  )
}

export default ProductCard
