import { useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"

import s from "./Modal.module.scss"
import { disablePageScroll, enablePageScroll } from "scroll-lock"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRoot = document.getElementById("modal-root")

  useEffect(() => {
    if (isOpen) {
      disablePageScroll()
    } else {
      enablePageScroll()
    }

    return () => {
      enablePageScroll()
    }
  }, [isOpen])

  if (!isOpen || !modalRoot) return null

  return createPortal(
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot,
  )
}
