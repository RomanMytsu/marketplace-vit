import s from "./PageLoader.module.scss"

const PageLoader = () => {
  return (
    <div className={s.pageLoaderContainer}>
      <div className={s.spinner} aria-label="Loading page" />
    </div>
  )
}

export default PageLoader
