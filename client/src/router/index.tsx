
import { StickyNavbar } from "@/layouts/NavBar";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Home = lazy(() => import('@/views/Home/index.tsx'))

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/home',
            element: (
               <StickyNavbar />
            ),
            children: [
                {
                    path: 'about',
                    element: (
                        <Suspense fallback={<>Loading</>} >
                            <Home />
                        </Suspense>
                    )
                }
            ]
        }
    ])

    return <RouterProvider router={router}></RouterProvider>
}

export default Router;