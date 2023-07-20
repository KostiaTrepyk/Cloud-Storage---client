import { RouteObject } from "react-router-dom";

// pages
import HomePage from "../../../pages/HomePage/HomePage";
import StoragePage from "../../../pages/StoragePage/StoragePage";
import ProfilePage from "../../../pages/ProfilePage/ProfilePage";
import AuthPage from "../../../pages/AuthPage/AuthPage";
import PageNotFound from "../../../pages/PageNotFound/PageNotFound";

// helpers
import { generateId } from "../helpers/generateId";

export const HOMEROUTE: RouteObject = {
    id: generateId(),
    path: "/",
    element: <HomePage />,
};

export const STORAGEROUTE: RouteObject = {
    id: generateId(),
    path: "/storage",
    element: <StoragePage />,
};

export const PROFILEROUTE: RouteObject = {
    id: generateId(),

    path: "/profile",
    element: <ProfilePage />,
};

export const AUTHROUTE: RouteObject = {
    id: generateId(),
    path: "/auth",
    element: <AuthPage />,
};

const PAGENOTFOUNDROUTE: RouteObject = {
    id: generateId(),
    path: "*",
    element: <PageNotFound />,
};

export const publicRoutes: RouteObject[] = [HOMEROUTE, STORAGEROUTE, AUTHROUTE, PAGENOTFOUNDROUTE];
export const privateRoutes: RouteObject[] = [PROFILEROUTE];
