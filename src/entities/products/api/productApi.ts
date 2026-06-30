import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { db } from "@/shared/firebase/firebase"
import type { Product } from "../model/types"

interface GetCatalogProductsParams {
  category: string
  limitCount?: number
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getSwiperProducts: builder.query<Product[], void>({
      async queryFn() {
        try {
          const { collection, getDocs } = await import("firebase/firestore")
          const querySnapshot = await getDocs(collection(db, "products-swiper"))
          const products: Product[] = []

          querySnapshot.forEach((doc) => {
            const data = doc.data()
            products.push({
              id: doc.id,
              name: data.name || "",
              title: data.title || "",
              category: data.category || "",
              img: data.img || "",
            })
          })
          return { data: products }
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : "Unknown error",
            },
          }
        }
      },
    }),
    getPersonalizedPack: builder.query<Product[], void>({
      async queryFn() {
        try {
          const { collection, getDocs } = await import("firebase/firestore")
          const querySnapshot = await getDocs(collection(db, "product-catalog"))
          const allProducts: Product[] = []
          querySnapshot.forEach((doc) => {
            const data = doc.data()
            allProducts.push({
              id: doc.id,
              name: data.name || "",
              title: data.title || data.name || "",
              category: data.category || "",
              img: data.img || "",
              price: typeof data.price === "number" ? data.price : 0,
            })
          })
          const randomizedPack = [...allProducts]
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
          return { data: randomizedPack }
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : "Unknown error",
            },
          }
        }
      },
    }),
    getCatalogProducts: builder.query<Product[], GetCatalogProductsParams>({
      async queryFn({ category, limitCount }) {
        try {
          const { collection, getDocs, query, where, limit } =
            await import("firebase/firestore")

          let catalogQuery = query(collection(db, "product-catalog"))

          if (category === "Sale%") {
            catalogQuery = query(catalogQuery, where("sale", "==", true))
          } else if (category && category !== "All categories") {
            catalogQuery = query(
              catalogQuery,
              where("category", "==", category),
            )
          }

          if (limitCount && limitCount > 0) {
            catalogQuery = query(catalogQuery, limit(limitCount))
          }

          const querySnapshot = await getDocs(catalogQuery)
          const products: Product[] = []

          querySnapshot.forEach((doc) => {
            const data = doc.data()

            const basePrice = typeof data.price === "number" ? data.price : 0
            const isSale = typeof data.sale === "boolean" ? data.sale : false
            const discountPercent =
              typeof data.discount === "number" ? data.discount : 0

            const price =
              isSale && discountPercent > 0
                ? Number((basePrice * (1 - discountPercent / 100)).toFixed(2))
                : basePrice

            const oldPrice =
              isSale && discountPercent > 0
                ? basePrice
                : typeof data.oldPrice === "number"
                  ? data.oldPrice
                  : undefined

            products.push({
              id: doc.id,
              name: data.name || "",
              title: data.title || data.name || "",
              category: data.category || "",
              img: data.img || "",
              price,
              oldPrice,
              sale: isSale,
              discount: data.discount,
            })
          })

          return { data: products }
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : "Unknown error",
            },
          }
        }
      },
    }),
    getProductById: builder.query<Product | null, string>({
      async queryFn(id) {
        try {
          const { doc, getDoc } = await import("firebase/firestore")
          const docRef = doc(db, "product-catalog", id)
          const docSnap = await getDoc(docRef)

          if (!docSnap.exists()) {
            return { data: null }
          }

          const data = docSnap.data()

          const basePrice = typeof data.price === "number" ? data.price : 0
          const isSale = typeof data.sale === "boolean" ? data.sale : false
          const discountPercent =
            typeof data.discount === "number" ? data.discount : 0

          const price =
            isSale && discountPercent > 0
              ? Number((basePrice * (1 - discountPercent / 100)).toFixed(2))
              : basePrice

          const oldPrice =
            isSale && discountPercent > 0
              ? basePrice
              : typeof data.oldPrice === "number"
                ? data.oldPrice
                : undefined

          const product: Product = {
            id: docSnap.id,
            name: data.name || "",
            category: data.category || "",
            img: data.img || "",
            price,
            oldPrice,
            sale: isSale,
            discount: data.discount,
          }

          return { data: product }
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : "Unknown error",
            },
          }
        }
      },
    }),
  }),
})

export const {
  useGetSwiperProductsQuery,
  useGetPersonalizedPackQuery,
  useGetCatalogProductsQuery,
  useGetProductByIdQuery,
} = productApi
