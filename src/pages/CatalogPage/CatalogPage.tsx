import CatalogHero from "./components/CatalogHero/CatalogHero"
import Catalog from "./components/Catalog/Catalog"
import { useTitle } from "@/shared/lib/hooks/useTitle"
import CatalogPromo from "./components/CatalogPromo/CatalogPromo"
import s from "./CatalogPage.module.scss"

const CatalogPage = () => {
  useTitle("Catalog")
  return (
    <div className={s.catalogPage}>
      <CatalogHero />
      <Catalog />
      <CatalogPromo />
    </div>
  )
}

export default CatalogPage
