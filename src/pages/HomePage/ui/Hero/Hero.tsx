import QuizLink from "@/shared/ui/QuizLink/QuizLink"
import s from "./Hero.module.scss"
import heroImg from "@/shared/assets/images/hero-img.webp"
import { Link } from "react-router-dom"
import Icon from "@/shared/ui/Icon/Icon"
import Ellipse from "@/shared/ui/Ellipse/Ellipse"
import Circle from "@/shared/ui/Circle/Circle"

const Hero = () => {
  return (
    <section className={s.hero}>
      <div className={s.wrapper}>
        <div className={s.content}>
          <h1 className={s.heroTitle}>
            Find out what <span className={s.accent}>vitamins</span> your body
            needs right now.
          </h1>
          <p className={s.heroText}>
            Answer a few simple questions and automatically get a personalazed
            list of vitamins in minutes
          </p>
          <div className={s.heroBtnWrapper}>
            <QuizLink variant="secondary" size="lg" />
            <Link to="/catalog" className={s.shopLink} viewTransition>
              Go to the shop{" "}
              <Icon
                name="arrow-shop"
                width={9}
                height={15}
                className={s.shopIcon}
              />
            </Link>
          </div>
        </div>
        <div className={s.heroImgWrapper}>
          <img
            src={heroImg}
            alt="Hero Img"
            className={s.heroImg}
            fetchPriority="high"
            loading="eager"
          />
        </div>
        <Ellipse className={s.ellipseYellow} />
        <Ellipse className={s.heroEllipse} />
        <Circle className={s.heroCircle} />
      </div>
    </section>
  )
}

export default Hero
