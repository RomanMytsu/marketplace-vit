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
            products.push({
              id: doc.id,
              name: data.name || "",
              title: data.title || data.name || "",
              category: data.category || "",
              img: data.img || "",
              price: typeof data.price === "number" ? data.price : 0,
              oldPrice:
                typeof data.oldPrice === "number" ? data.oldPrice : undefined,
              sale: typeof data.sale === "boolean" ? data.sale : false,
              discount:
                typeof data.discount === "number" ? data.discount : undefined,
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
  }),
})

export const {
  useGetSwiperProductsQuery,
  useGetPersonalizedPackQuery,
  useGetCatalogProductsQuery,
} = productApi
