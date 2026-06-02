const images = import.meta.glob<{ default: string }>(
  "/src/shared/assets/images/**/*",
  {
    eager: true,
  },
)
export const getProductImageUrl = (dbPath: string): string => {
  if (!dbPath) return ""
  if (dbPath.startsWith("http")) return dbPath

  const fileName = dbPath.split("/").pop()

  if (!fileName) return ""

  const mapKey = `/src/shared/assets/images/${fileName}`

  return images[mapKey]?.default || ""
}
