import Circle from "@/shared/ui/Circle/Circle"
import s from "./About.module.scss"
import productsImg from "@/shared/assets/images/about-products.webp"
import capsuleImg from "@/shared/assets/images/about-capsules.webp"
import Icon from "@/shared/ui/Icon/Icon"

const About = () => {
  return (
    <section className={s.about}>
      <div className={s.about__wrapper}>
        <div className={s.about__content}>
          <h2 className={s.about__title}>
            Healthy doesn’t have to be hard. We make it easy.
          </h2>
          <Circle className={s.about__circle} />
        </div>
        <div className={s.about__iconsWrapper}>
          <ul className={s.about__list}>
            <li className={s.about__item}>
              <Icon
                name="bottle-icon"
                className={s.about__bottleIcon}
                width={103}
                height={84}
              />
              <p className={s.about__itemText}>
                Healthy doesn’t have to be hard. We make it easy.
              </p>
            </li>
            <li className={s.about__item}>
              <Icon
                name="plant-icon"
                className={s.about__plantIcon}
                width={88}
                height={97}
              />
              <p className={s.about__itemText}>
                Healthy doesn’t have to be hard. We make it easy.
              </p>
            </li>
            <li className={s.about__item}>
              <Icon
                name="bag-icon"
                className={s.about__bagIcon}
                width={84}
                height={107}
              />
              <p className={s.about__itemText}>
                Healthy doesn’t have to be hard. We make it easy.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.about__contentImg1}>
        <img
          src={productsImg}
          alt="Products Images "
          width={530}
          height={450}
        />
      </div>
      <div className={s.about__contentImg2}>
        <img src={capsuleImg} alt="Products Images " width={801} height={470} />
      </div>
    </section>
  )
}

export default About
