import type React from "react"
import s from "./Products.module.scss"
import { Swiper, SwiperSlide } from "swiper/react"
import { useGetSwiperProductsQuery } from "@/entities/products/api/productApi"
import { Link } from "react-router-dom"
import ProductCard from "@/entities/products/ui/ProductCard/ProductCard"
import "swiper/css"
import productsImg from "@/shared/assets/images/products-img.webp"
import Icon from "@/shared/ui/Icon/Icon"

const Products: React.FC = () => {
  const { data: products, isLoading, error } = useGetSwiperProductsQuery()

  if (isLoading) return <div className={s.loading}>Loading products...</div>
  if (error) return <div className={s.error}>Error loading products</div>
  if (!products || products.length === 0) return null

  return (
    <section className={s.products}>
      <div>
        <div className={s.products__wrapper}>
          <div className={s.products__sliderBlock}>
            <Swiper
              spaceBetween={10}
              slidesPerView={"auto"}
              loop={true}
              grabCursor={true}
              breakpoints={{
                1024: { spaceBetween: 33 },
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} className={s.slide}>
                  <ProductCard product={product} variant="slider" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={s.products__contentBlock}>
            <div className={s.products__contentWrapper}>
              <h2 className={s.products__title}>Choose your products</h2>
              <p className={s.products__description}>
                We'll help you create a health plan with vitamins, supplements,
                and more that help you feel your best today and support you
                long-term.
              </p>
              <Link to="/catalog" className={s.products__shopLink}>
                Go to the shop{" "}
                <Icon
                  name="arrow-shop"
                  width={9}
                  height={15}
                  className={s.shopIcon}
                />
              </Link>
            </div>
            <img
              src={productsImg}
              alt="Products img"
              className={s.products__img}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products
