import { Link } from "react-router-dom"
import s from "./NotFoundPage.module.scss"
import { useTitle } from "@/shared/lib/hooks/useTitle"
import notFound from "@/shared/assets/images/404.webp"

const NotFoundPage = () => {
  useTitle("NotFoundPage")
  return (
    <div className={s.notFound}>
      <div className={s.notFound__content}>
        <div className={s.notFound__digits} aria-hidden="true">
          <img
            src={notFound}
            alt="Image Not Found"
            className={s.notFound__img}
            loading="lazy"
            width={490}
            height={202}
          />
        </div>
        <h1 className={s.notFound__title}>Page not found</h1>
        <p className={s.notFound__subtitle}>
          Unfortunately, the page you requested is out of date or does not exist
        </p>
        <Link to="/" className={s.notFound__link}>
          Go to main page
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
