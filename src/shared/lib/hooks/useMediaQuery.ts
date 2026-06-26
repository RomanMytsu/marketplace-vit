import { useCallback, useSyncExternalStore } from "react"

export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQueryList = window.matchMedia(query)
      mediaQueryList.addEventListener("change", callback)

      return () => mediaQueryList.removeEventListener("change", callback)
    },
    [query],
  )

  const getSnapshot = () => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches
    }
    return false
  }

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
