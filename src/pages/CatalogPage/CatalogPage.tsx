import CatalogHero from "./components/CatalogHero/CatalogHero"
import Catalog from "./components/Catalog/Catalog"
import { useTitle } from "@/shared/lib/hooks/useTitle"
import CatalogPromo from "./components/CatalogPromo/CatalogPromo"
import CatalogReview from "./components/CatalogReview/CatalogReview"

const CatalogPage = () => {
  useTitle("Catalog")
  return (
    <>
      <CatalogHero />
      <Catalog />
      <CatalogPromo />
      <CatalogReview />
    </>
  )
}

export default CatalogPage
