import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

export default defineConfig({
  base: "/marketplace-vit/",
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/shared/assets/icons")],
      symbolId: "icon-[name]",
      svgoOptions: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
          {
            name: "convertColors",
            params: {
              currentColor: true,
            },
          },
        ],
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/shared/styles/abstracts/mixins.scss" as globalMixins;
        @use "@/shared/styles/abstracts/variables.scss" as globalVariables;
        @use "@/shared/styles/abstracts/functions.scss" as globalFunctions;
        `,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.toLowerCase().replace(/\\/g, "/")
          if (!normalizedId.includes("node_modules")) return
          if (
            normalizedId.includes("node_modules/react/") ||
            normalizedId.includes("node_modules/react-dom/") ||
            normalizedId.includes("node_modules/react-router/") ||
            normalizedId.includes("node_modules/react-router-dom/") ||
            normalizedId.includes("node_modules/scheduler/")
          ) {
            return "react-core"
          }
          if (
            normalizedId.includes("node_modules/@reduxjs/") ||
            normalizedId.includes("node_modules/immer/") ||
            normalizedId.includes("node_modules/redux/")
          ) {
            return "redux-state"
          }
          if (
            normalizedId.includes("node_modules/@firebase/") ||
            normalizedId.includes("node_modules/firebase/")
          ) {
            return "firebase-backend"
          }

          if (normalizedId.includes("node_modules/libphonenumber-js/")) {
            return "phone-utils"
          }
          if (normalizedId.includes("node_modules/swiper/")) {
            return "swiper-slider"
          }
          return "vendor"
        },
      },
    },
  },
})
