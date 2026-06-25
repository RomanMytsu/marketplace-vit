import BannerMain from "@/shared/ui/Banners/BannerMain/BannerMain"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { SLIDER_DATA } from "./CatalogHero.data"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Icon from "@/shared/ui/Icon/Icon"
import s from "./CatalogHero.module.scss"

const CatalogHero = () => {
  const nextEl = s.hero__next ? `.${s.hero__next}` : undefined
  const prevEl = s.hero__prev ? `.${s.hero__prev}` : undefined
  const paginationEl = s.hero__pagination ? `.${s.hero__pagination}` : undefined
  return (
    <section className={s.hero}>
      <div className={s.hero__sliderContainer}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          grabCursor={true}
          speed={400}
          watchSlidesProgress={true}
          navigation={{
            nextEl,
            prevEl,
          }}
          pagination={{
            clickable: true,
            el: paginationEl,
          }}
          className={s.hero__swiperTrack}
        >
          {SLIDER_DATA.map((slide) => (
            <SwiperSlide key={slide.id} className={s.hero__swiperSlide}>
              <BannerMain
                variant={slide.variant}
                label={slide.label}
                title={slide.title}
                subTitle={slide.subTitle}
                btnText={slide.btnText}
                btnLink={slide.btnLink}
                imgSrc={slide.imgSrc}
                width={slide.width}
                height={slide.height}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          className={`${s.hero__navBtn} ${s.hero__prev}`}
          aria-label="Previous slide"
        >
          <Icon name="back_arrow" width={9} height={15} />
        </button>
        <button
          type="button"
          className={`${s.hero__navBtn} ${s.hero__next}`}
          aria-label="Next slide"
        >
          <Icon name="back_arrow" width={9} height={15} />
        </button>
        <div className={s.hero__pagination} />
      </div>
    </section>
  )
}

export default CatalogHero
