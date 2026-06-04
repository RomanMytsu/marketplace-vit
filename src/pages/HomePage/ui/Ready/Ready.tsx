import Icon from "@/shared/ui/Icon/Icon"
import s from "./Ready.module.scss"
import QuizLink from "@/shared/ui/QuizLink/QuizLink"
import { Link } from "react-router-dom"
import Ellipse from "@/shared/ui/Ellipse/Ellipse"

const Ready = () => {
  return (
    <section className={s.ready}>
      <div className="container">
        <div className={s.ready__wrapper}>
          <Icon name="ready-icon" className={s.ready__icon} />
          <h2 className={s.ready__title}>Ready to get started?</h2>
          <p className={s.ready__subTitle}>
            We'll help you create a health plan with vitamins, supplements, and
            more that help you feel your best today and support you long-term.
          </p>
          <QuizLink variant="secondary" size="lg" />
          <Link to="/catalog" className={s.ready__shopLink}>
            Go to the shop{" "}
            <Icon
              name="arrow-shop"
              width={9}
              height={15}
              className={s.shopIcon}
            />
          </Link>
        </div>
        <Ellipse className={s.ready__ellipse} />
        <Ellipse className={s.ready__ellipseRed} />
      </div>
    </section>
  )
}

export default Ready
