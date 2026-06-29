import { useState, useRef, useEffect } from "react"
import Icon from "@/shared/ui/Icon/Icon"
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside"
import s from "./CatalogFilter.module.scss"

interface CatalogFilterProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const CatalogFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CatalogFilterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useClickOutside(dropdownRef, () => setIsOpen(false))

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  const handleSelect = (category: string) => {
    onSelectCategory(category)
    setIsOpen(false)
  }

  return (
    <div className={s.filter} ref={dropdownRef}>
      <button
        type="button"
        className={`${s.filter__dropdownToggle} ${isOpen ? s.filter__dropdownToggle_active : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="catalog-category-list"
        aria-label={`Filter by category. Current: ${selectedCategory}`}
      >
        <span>{selectedCategory}</span>
        <Icon
          name="back_arrow"
          width={19}
          height={11}
          className={s.filter__arrowIcon}
        />
      </button>
      <ul
        className={`${s.filter__list} ${isOpen ? s.filter__list_open : ""}`}
        role="listbox"
        aria-label="Categories"
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category
          const isSale =
            category.toLowerCase().includes("sale") || category.includes("%")

          return (
            <li key={category} className={s.filter__item} role="none">
              <button
                type="button"
                className={`${s.filter__btn} ${isSelected ? s.filter__btn_active : ""} ${isSale ? s.filter__btn_sale : ""}`}
                onClick={() => handleSelect(category)}
                role="option"
                aria-selected={isSelected}
              >
                {category}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CatalogFilter
