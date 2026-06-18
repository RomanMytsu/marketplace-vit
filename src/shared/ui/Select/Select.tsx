import { useState, useRef, useEffect } from "react"
import clsx from "clsx"
import Icon from "@/shared/ui/Icon/Icon"
import s from "./Select.module.scss"

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  name: string
  value: string
  options: SelectOption[]
  onChange: (name: string, value: string) => void
  onBlur?: (name: string) => void
  error?: string
  className?: string
}

const Select = ({
  label,
  name,
  value,
  options,
  onChange,
  onBlur,
  error,
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        if (onBlur) onBlur(name)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [name, onBlur])

  const handleOptionClick = (optValue: string) => {
    onChange(name, optValue)
    setIsOpen(false)
  }

  return (
    <div className={clsx(s.selectWrapper, className)} ref={dropdownRef}>
      {label && (
        <label className={s.selectLabel} htmlFor={name}>
          {label}
        </label>
      )}
      <div className={s.selectContainer}>
        <button
          id={name}
          type="button"
          className={clsx(
            s.selectInput,
            isOpen && s.selectInput_open,
            error && s.selectInput_error,
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{currentOption ? currentOption.label : value}</span>
          <Icon
            name="select_arrow"
            className={clsx(s.selectIcon, isOpen && s.selectIcon_rotated)}
            width={15}
            height={9}
          />
        </button>
        {isOpen && (
          <ul className={s.selectDropdown}>
            {options.map((opt) => (
              <li
                key={opt.value}
                className={clsx(
                  s.selectOption,
                  opt.value === value && s.selectOption_selected,
                )}
                onClick={() => handleOptionClick(opt.value)}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <span className={s.selectError}>{error}</span>}
    </div>
  )
}

export default Select
