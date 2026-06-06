import { Toaster, type DefaultToastOptions } from "react-hot-toast"
import s from "./CustomToaster.module.scss"
import Icon from "../Icon/Icon"

const toastConfig: DefaultToastOptions = {
  duration: 5000,
  success: {
    className: `${s.toastCard} ${s.success}`,
    icon: (
      <Icon name="toast-ok" width={20} height={14} />
    ),
  },
  error: {
    className: `${s.toastCard} ${s.error}`,
    icon: (
      <svg
        width="20"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  },
}

export const CustomToaster = () => {
  return <Toaster position="top-center" toastOptions={toastConfig} />
}
