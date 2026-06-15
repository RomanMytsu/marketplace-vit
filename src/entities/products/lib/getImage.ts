const images = import.meta.glob<{ default: string }>(
  "/src/shared/assets/images/**/*",
  {
    eager: true,
  },
)
export const getProductImageUrl = (dbPath: string): string => {
  if (!dbPath) return ""
  if (dbPath.startsWith("http")) return dbPath

  const normalizedPath = dbPath.startsWith("/") ? dbPath : `/${dbPath}`
  const exactKey = normalizedPath.startsWith("/src")
    ? normalizedPath
    : `/src${normalizedPath}`

  if (images[exactKey]) {
    return images[exactKey].default
  }

  const fileName = dbPath.split("/").pop()
  if (fileName) {
    const foundKey = Object.keys(images).find((key) =>
      key.endsWith(`/${fileName}`),
    )
    if (foundKey) {
      return images[foundKey].default
    }
  }

  return ""
}
