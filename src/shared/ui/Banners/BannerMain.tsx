import { Link } from "react-router-dom"
import clsx from "clsx"
import s from "./BannerMain.module.scss"

export type BannerVariant = "quiz" | "vitamins" | "pain-relief"

interface BannerMainProps {
  variant?: BannerVariant
  label?: string
  title: string
  subTitle: string
  btnText: string
  btnLink: string
  imgSrc: string
  imgAlt?: string
  width: string
  height: string
}

const BannerMain = ({
  variant,
  label,
  title,
  subTitle,
  btnText,
  btnLink,
  imgSrc,
  imgAlt = "Banner Image",
  width,
  height,
}: BannerMainProps) => {
  return (
    <div
      className={clsx(s.bannerMain, {
        [s["bannerMain--quiz"]]: variant === "quiz",
        [s["bannerMain--vitamins"]]: variant === "vitamins",
        [s["bannerMain--painRelief"]]: variant === "pain-relief",
      })}
    >
      <div className={s.bannerMain__content}>
        {label && <span className={s.bannerMain__label}>{label}</span>}
        <h3 className={s.bannerMain__title}>{title}</h3>
        <p className={s.bannerMain__subTitle}>{subTitle}</p>
        <Link to={btnLink} className={s.bannerMain__link}>
          {btnText}
        </Link>
      </div>
      <div className={s.bannerMain__imgWrapper}>
        <img
          src={imgSrc}
          alt={imgAlt}
          loading="lazy"
          width={width}
          height={height}
        />
      </div>
    </div>
  )
}

export default BannerMain
