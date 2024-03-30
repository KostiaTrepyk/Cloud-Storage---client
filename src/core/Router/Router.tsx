import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";

import Layout from "components/Layout/Layout";
import ErrorPage from "pages/ErrorPage/ErrorPage";

const Router = () => {
    const router = createBrowserRouter([
        {
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: routes,
        },
    ]);

    return <RouterProvider router={router}></RouterProvider>;
};

export default Router;
