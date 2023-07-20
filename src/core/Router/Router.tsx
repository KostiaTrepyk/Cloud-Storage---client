import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";

import { privateRoutes, publicRoutes } from "./types/routes";
import { generateId } from "./helpers/generateId";

import Layout from "../../components/Layout/Layout";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

const Router = () => {
    const isAuth = useAppSelector((store) => store.auth.isAuth);

    const router = createBrowserRouter([
        {
            id: generateId(),
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: [...publicRoutes, ...(isAuth ? privateRoutes : [])],
        },
    ]);

    return <RouterProvider router={router}></RouterProvider>;
};

export default Router;
