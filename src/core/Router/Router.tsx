import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./types/routes";
import { generateId } from "./helpers/generateId";

import Layout from "../../components/Layout/Layout";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

const Router = () => {
    const router = createBrowserRouter([
        {
            id: generateId(),
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: routes,
        },
    ]);

    return <RouterProvider router={router}></RouterProvider>;
};

export default Router;
