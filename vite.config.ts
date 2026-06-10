import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import { visualizer } from "rollup-plugin-visualizer"

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
    visualizer({
      filename: "dist/bundle-analysis.html",
      open: true,
      gzipSize: true,
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

          const parts = normalizedId.split("node_modules/")
          const packagePath = parts[parts.length - 1] || ""
          if (
            packagePath.startsWith("react/") ||
            packagePath.startsWith("react-dom/") ||
            packagePath.startsWith("react-router/") ||
            packagePath.startsWith("react-router-dom/") ||
            packagePath.startsWith("scheduler/")
          ) {
            return "react"
          }
          if (
            packagePath.startsWith("@reduxjs/") ||
            packagePath.startsWith("immer/") ||
            packagePath.startsWith("redux/")
          ) {
            return "redux"
          }
          if (packagePath.startsWith("swiper/")) {
            return "swiper"
          }
          if (packagePath.startsWith("lucide-react/")) {
            return "lucide"
          }
          return "vendor"
        },
      },
    },
  },
})
