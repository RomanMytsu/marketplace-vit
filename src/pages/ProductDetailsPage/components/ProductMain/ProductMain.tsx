import { useParams, Link } from "react-router-dom"
import { useTitle } from "@/shared/lib/hooks/useTitle"
import { useGetProductByIdQuery } from "@/entities/products/api/productApi"
import { getCategoryClass } from "@/shared/lib/helpers/categoryStyles"
import Icon from "@/shared/ui/Icon/Icon"
import ProductVisual from "../ProductVisual/ProductVisual"
import PurchaseWidget from "../PurchaseWidget/PurchaseWidget"
import ProductDescription from "../ProductDescription/ProductDescription"
import ProductImportantInfo from "../ProductImportantInfo/ProductImportantInfo"
import s from "./ProductMain.module.scss"

const ProductMain = () => {
  const { id } = useParams<{ id: string }>()
  const { data: product } = useGetProductByIdQuery(id ?? "")

  useTitle(product ? product.name : "Product Details")

  if (!product) return null

  const textClass = getCategoryClass(product.category, "text")

  return (
    <section className={s.detailsPage}>
      <div className={s.detailsPage__wrapper}>
        <ProductVisual
          img={product.img}
          name={product.name}
          category={product.category}
        />
        <div className={s.detailsPage__content}>
          <Link
            to="/catalog"
            className={s.detailsPage__backLink}
            viewTransition
          >
            <Icon
              name="back_arrow"
              width={9}
              height={15}
              className={s.detailsPage__backIcon}
            />
            <span>Back to shop</span>
          </Link>
          <p className={`${s.detailsPage__category} ${textClass}`}>
            {product.category}
          </p>
          <h3 className={s.detailsPage__title}>{product.name}</h3>
          <PurchaseWidget
            id={product.id}
            name={product.name}
            img={product.img}
            price={Number(product.price ?? 0)}
            oldPrice={product.oldPrice}
            discount={product.discount}
            category={product.category}
          />
          <ProductDescription productName={product.name} />
          <ProductImportantInfo />
        </div>
      </div>
    </section>
  )
}

export default ProductMain
