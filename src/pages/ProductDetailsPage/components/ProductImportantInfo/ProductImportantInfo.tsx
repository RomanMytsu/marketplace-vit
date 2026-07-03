import s from "./ProductImportantInfo.module.scss"

const ProductImportantInfo = () => {
  return (
    <div className={s.importantInfo}>
      <h2 className={s.importantInfo__title}>Important information</h2>
      <div className={s.importantInfo__row}>
        <p className={s.importantInfo__key}>Safety information</p>
        <p className={s.importantInfo__value}>
          Keep out of the reach of children.
        </p>
      </div>
      <div className={s.importantInfo__row}>
        <p className={s.importantInfo__key}>Indications</p>
        <p className={s.importantInfo__value}>
          Deficient or weak Immune System Function
        </p>
      </div>
      <div className={s.importantInfo__row}>
        <p className={s.importantInfo__key}>Ingredients</p>
        <p className={s.importantInfo__value}>
          Vitamin C (as ascorbic acid), Citrus Bioflavonoid Complex
          [standardized to 45% (225 mg) bioflavonoids: hesperidin and other
          naturally occurring phenolic compounds]. Other Ingredients: Cellulose,
          silica, stearic acid (vegetable), croscarmellose sodium, magnesium
          stearate (vegetable), and coating (hypromellose, medium chain
          triglycerides, and hydroxypropylcellulose).
        </p>
      </div>
      <div className={s.importantInfo__row}>
        <p className={s.importantInfo__key}>Directions</p>
        <p className={s.importantInfo__value}>
          Take one tablet daily or as directed by your healthcare practitioner.
        </p>
      </div>
      <div className={s.importantInfo__row}>
        <p className={s.importantInfo__key}>Legal Disclaimer</p>
        <p className={s.importantInfo__value}>
          *These statements have not been evaluated by the Food and Drug
          Administration. This product is not intended to diagnose, treat, cure,
          or prevent any disease. <br /> <br /> Statements regarding dietary
          supplements have not been evaluated by the FDA and are not intended to
          diagnose, treat, cure, or prevent any disease or health condition.
        </p>
      </div>
    </div>
  )
}

export default ProductImportantInfo
