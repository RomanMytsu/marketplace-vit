import { RouterProvider } from "react-router-dom"
import router from "./providers/router/router"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { Suspense } from "react"

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  )
}

export default App
