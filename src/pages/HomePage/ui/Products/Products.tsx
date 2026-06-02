import type React from "react"
import s from "./Products.module.scss"
import { Swiper, SwiperSlide } from "swiper/react"
import { useGetSwiperProductsQuery } from "@/entities/products/api/productApi"
import { Link } from "react-router-dom"
import ProductCard from "@/entities/products/ui/ProductCard/ProductCard"
import "swiper/css"

const Products: React.FC = () => {
  const { data: products, isLoading, error } = useGetSwiperProductsQuery()

  if (isLoading) return <div className={s.loading}>Loading products...</div>
  if (error) return <div className={s.error}>Error loading products</div>
  if (!products || products.length === 0) return null

  return (
    <section className={s.products}>
      <div className={s.container}>
        <div className={s.contentBlock}>
          <h2 className={s.title}>Choose your products</h2>
          <p className={s.description}>
            We'll help you create a health plan with vitamins, supplements, and
            more that help you feel your best today and support you long-term.
          </p>
          <Link to="/shop" className={s.shopLink}>
            Go to the shop <span className={s.arrow}>&gt;</span>
          </Link>
        </div>

        <div className={s.sliderBlock}>
          <Swiper
            spaceBetween={33}
            slidesPerView={"auto"}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 1.1, spaceBetween: 10 },
              768: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 2.5, spaceBetween: 24 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className={s.slide}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Products
