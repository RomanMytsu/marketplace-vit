import Ellipse from "@/shared/ui/Ellipse/Ellipse"
import Circle from "@/shared/ui/Circle/Circle"
import s from "./TellUs.module.scss"
import QuizLink from "@/shared/ui/QuizLink/QuizLink"
import icon from "@/shared/assets/icons/tell-us-icon.svg"

const TellUs = () => {
  return (
    <section className={s.tellUs}>
      <div className="container">
        <div className={s.tellUs__content}>
          <Ellipse className={s.tellUs__ellipse} />
          <Circle className={s.tellUs__circle} />
          <div className={s.tellUs__titleWrapper}>
            <img src={icon} alt="Icon" className={s.tellUs__icon} />
            <h2 className={s.tellUs__title}>
              Tell us a little about yourself. We’re good listeners.
            </h2>
            <p className={s.tellUs__text}>
              We'll help you create a health plan with vitamins, supplements,
              and more that help you feel your best today and support you
              long-term.
            </p>
            <QuizLink variant="secondary" size="lg" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TellUs
