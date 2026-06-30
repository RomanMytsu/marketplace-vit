import s from "./ProductDescription.module.scss"

interface ProductDescriptionProps {
  productName: string
}

const ProductDescription = ({ productName }: ProductDescriptionProps) => {
  return (
    <div className={s.description}>
      <h2 className={s.description__title}>Description</h2>
      <p className={s.description__text}>
        {productName} is a synergistic formula that features a specialized
        complex of bioflavonoids combined with vitamin C.*
      </p>
      <ul className={s.description__list}>
        <li className={s.description__listItem}>Citrus bioflavonoid complex</li>
        <li className={s.description__listItem}>
          Provides potent antioxidant protection and supports healthy immune
          system function*
        </li>
        <li className={s.description__listItem}>
          Supports healthy collagen production, the main component of connective
          tissue*
        </li>
        <li className={s.description__listItem}>
          This product is non-GMO, gluten free, and vegetarian
        </li>
      </ul>
    </div>
  )
}

export default ProductDescription
