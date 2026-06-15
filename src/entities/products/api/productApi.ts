import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Product } from "../model/types"
import { db } from "@/shared/firebase/firebase"

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
  }),
})

export const { useGetSwiperProductsQuery, useGetPersonalizedPackQuery } =
  productApi
