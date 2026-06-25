import s from "./CatalogPage.module.scss"
import  CatalogHero  from "./components/CatalogHero/CatalogHero"

const CatalogPage = () => {
  return (
    <div className={s.catalog}>
      <CatalogHero />
    </div>
  )
}

export default CatalogPage
