import { useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { disablePageScroll, enablePageScroll } from "scroll-lock"
import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from "motion/react"
import clsx from "clsx"
import s from "./Modal.module.scss"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

const backdropVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

const contentVariants: Variants = {
  initial: {
    x: "100vw",
  },
  animate: {
    x: 0,
  },
  exit: {
    x: "100vw",
  },
}

const transition: Transition = {
  duration: 0.4,
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  const modalRoot =
    typeof window !== "undefined" ? document.getElementById("modal-root") : null

  useEffect(() => {
    if (!isOpen) return

    disablePageScroll()

    return () => {
      enablePageScroll()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!modalRoot) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          className={s.backdrop}
          onClick={onClose}
        >
          <motion.div
            className={clsx(s.content, className)}
            onClick={(e) => e.stopPropagation()}
            variants={contentVariants}
            transition={transition}
            role="dialog"
            aria-modal="true"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot,
  )
}
