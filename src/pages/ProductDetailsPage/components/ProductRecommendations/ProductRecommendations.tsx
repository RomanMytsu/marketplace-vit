import ProductCard from "@/shared/ui/ProductCard/ProductCard"
import { useGetPersonalizedPackQuery } from "@/entities/products/api/productApi"
import s from "./ProductRecommendations.module.scss"

interface ProductItem {
  id: string
  name: string
  price: number
  oldPrice?: number
  category: string
  img: string
  sale?: boolean
  discount?: number
}

const ProductRecommendations = () => {
  const { data: recommendations = [] } = useGetPersonalizedPackQuery()

  if (recommendations.length === 0) return null

  return (
    <section className={s.recommendations}>
      <div className="container">
        <h2 className={s.recommendations__title}>You may also like</h2>
        <div className={s.recommendations__grid}>
          {recommendations.map((item: ProductItem) => (
            <ProductCard key={item.id} product={item} variant="catalog" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductRecommendations
