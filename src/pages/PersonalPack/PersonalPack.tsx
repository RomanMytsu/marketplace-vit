import { useAppSelector } from "@/app/store/hooks"
import { selectUserName } from "@/features/Quiz/model/selectors"
import { useTitle } from "@/shared/lib/hooks/useTitle"
import { useGetPersonalizedPackQuery } from "@/entities/products/api/productApi"
import ProductCard from "@/entities/products/ui/ProductCard/ProductCard"
import Button from "@/shared/ui/Button"
import { useEffect } from "react"
import toast from "react-hot-toast"
import s from "./PersonalPack.module.scss"

const PersonalPack = () => {
  useTitle("Personal Pack")
  const userName = useAppSelector(selectUserName)

  const { data: products, error } = useGetPersonalizedPackQuery()

  useEffect(() => {
    if (error) {
      toast.error(
        "Failed to load your personalized pack. Please try again later.",
      )
    }
  }, [error])

  return (
    <div className={s.personalPack}>
      <div className={s.personalPack__header}>
        <h1 className={s.personalPack__title}>
          {userName}, we made personalized pack for you!
        </h1>
        <h2 className={s.personalPack__subtitle}>Recommenadation</h2>
        <p className={s.personalPack__description}>
          Your recommendation is based on your answers and our database of
          clinical research. This health plan, made just for you, is recommended
          for you to feel your best today while supporting long-term health.
        </p>
      </div>
      <div className={s.personalPack__wrapper}>
        <div className={s.personalPack__packContainer}>
          <h3 className={s.personalPack__packTitle}>Your Personalized Pack</h3>
          <div className={s.personalPack__grid}>
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} variant="pack" />
            ))}
          </div>
          <Button className={s.personalPack__btn}>Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default PersonalPack
