import ProductCard from "@/shared/ui/ProductCard/ProductCard"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import { incrementMobileLimit } from "@/entities/products/model/catalogSlice"
import { useGetCatalogProductsQuery } from "@/entities/products/api/productApi"
import Icon from "@/shared/ui/Icon/Icon"
import { selectMobileLimit } from "@/entities/products/model/selectors"
import { useSearchParams } from "react-router-dom"
import { useMediaQuery } from "@/shared/lib/hooks/useMediaQuery"
import s from "./CatalogGrid.module.scss"

const CatalogGrid = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const selectedCategory = searchParams.get("category") || "All categories"
  const mobileLimit = useAppSelector(selectMobileLimit)

  const isMobile = useMediaQuery("(max-width: 1024px)")

  const { data: products = [] } = useGetCatalogProductsQuery({
    category: selectedCategory,
    limitCount: isMobile ? mobileLimit : undefined,
  })

  const handleLoadMore = () => {
    dispatch(incrementMobileLimit())
  }

  const hasMore = isMobile && products.length === mobileLimit
  return (
    <div className={s.catalogGrid}>
      <div className={s.catalogGrid__catalogGridContainer}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="catalog" />
        ))}
      </div>

      {hasMore && (
        <div className={s.catalogGrid__pagination}>
          <button
            type="button"
            className={s.catalogGrid__viewMoreBtn}
            onClick={handleLoadMore}
          >
            <span>View more</span>
            <Icon
              name="back_arrow"
              width={10}
              height={15}
              className={s.catalogGrid__arrowIcon}
            />
          </button>
        </div>
      )}
    </div>
  )
}

export default CatalogGrid
