
import { StickyNavbar } from "@/layouts/NavBar";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Home = lazy(() => import('@/views/Home/index.tsx'))
const SignUp = lazy(() => import('@/views/Auth/Signin'))

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
        },{
            path: '/auth',
            children: [
                {
                    path: 'sign-up',
                    element: (
                        <Suspense fallback={<>Loading</>} >
                            <SignUp />
                        </Suspense>
                    )
                }
            ]
        }
    ])

    return <RouterProvider router={router}></RouterProvider>
}

export default Router;