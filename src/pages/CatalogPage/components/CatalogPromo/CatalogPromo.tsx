import BannerMain from "@/shared/ui/Banners/BannerMain"
import s from "./CatalogPromo.module.scss"
import { SLIDER_DATA } from "../CatalogHero/CatalogHero.data"

const CatalogPromo = () => {
  const promoBanner = SLIDER_DATA.find((banner) => banner.id === "banner-pain")

  if (!promoBanner) {
    return null
  }
  return (
    <section className={s.catalogPromo}>
      <div className={s.catalogPromo__container}>
        <BannerMain {...promoBanner} />
      </div>
    </section>
  )
}

export default CatalogPromo
