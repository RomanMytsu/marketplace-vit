import { RouterProvider } from "react-router-dom"
import router from "./providers/router/router"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { Suspense } from "react"
import PageLoader from "@/shared/ui/PageLoader/PageLoader"
import { resetQuiz } from "@/features/Quiz/model/quizSlice"

router.subscribe((state) => {
  const path = state.location.pathname
  if (path !== "/quiz" && path !== "/personal-pack") {
    store.dispatch(resetQuiz())
  }
})

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  )
}

export default App
