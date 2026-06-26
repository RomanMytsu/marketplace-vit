import { useAppDispatch } from "@/app/store/hooks"
import CatalogFilter from "../CatalogFilter/CatalogFilter"
import CatalogGrid from "../CatalogGrid/CatalogGrid"
import s from "./Catalog.module.scss"
import { resetMobileLimit } from "@/entities/products/model/catalogSlice"
import { useSearchParams } from "react-router-dom"

const CATEGORIES = [
  "All categories",
  "Vitamins & Dietary Supplements",
  "Weight Loss",
  "Minerals",
  "Antioxidants",
  "Probiotics",
  "Pain Relief",
  "Prenatal Vitamins",
  "Sale%",
]

const Catalog = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get("category") || "All categories"

  const handleSelectCategory = (category: string) => {
    const newParams = new URLSearchParams(searchParams)

    if (category === "All categories") {
      newParams.delete("category")
    } else {
      newParams.set("category", category)
    }

    setSearchParams(newParams)
    dispatch(resetMobileLimit())
  }
  return (
    <section className={s.catalog}>
      <div className="container">
        <div className={s.catalog__wrapper}>
          <CatalogFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
          <CatalogGrid />
        </div>
      </div>
    </section>
  )
}

export default Catalog
