import s from "./ProductImportantInfo.module.scss"

const ProductImportantInfo = () => {
  return (
    <div className={s.importantInfo}>
      <h2 className={s.importantInfo__title}>Important information</h2>
      <div className={s.infoGrid}>
        <div className={s.infoGrid__row}>
          <span className={s.infoGrid__key}>Safety information</span>
          <span className={s.infoGrid__value}>
            Keep out of the reach of children.
          </span>
        </div>
        <div className={s.infoGrid__row}>
          <span className={s.infoGrid__key}>Indications</span>
          <span className={s.infoGrid__value}>
            Deficient or weak Immune System Function
          </span>
        </div>
        <div className={s.infoGrid__row}>
          <span className={s.infoGrid__key}>Ingredients</span>
          <span className={s.infoGrid__value}>
            Vitamin C (as ascorbic acid), Citrus Bioflavonoid Complex
            [standardized to 45% (225 mg) bioflavonoids: hesperidin and other
            naturally occurring phenolic compounds]. Other Ingredients:
            Cellulose, silica, stearic acid (vegetable), croscarmellose sodium,
            magnesium stearate (vegetable), and coating (hypromellose, medium
            chain triglycerides, and hydroxypropylcellulose).
          </span>
        </div>
        <div className={s.infoGrid__row}>
          <span className={s.infoGrid__key}>Directions</span>
          <span className={s.infoGrid__value}>
            Take one tablet daily or as directed by your healthcare
            practitioner.
          </span>
        </div>
        <div className={s.infoGrid__row}>
          <span className={s.infoGrid__key}>Legal Disclaimer</span>
          <span className={s.infoGrid__value}>
            *These statements have not been evaluated by the Food and Drug
            Administration. This product is not intended to diagnose, treat,
            cure, or prevent any disease. Statements regarding dietary
            supplements have not been evaluated by the FDA and are not intended
            to diagnose, treat, cure, or prevent any disease or health
            condition.
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductImportantInfo
