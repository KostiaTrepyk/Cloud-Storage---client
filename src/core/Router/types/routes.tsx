import { RouteObject } from "react-router-dom";
import { generateId } from "../helpers/generateId";

// pages
import HomePage from "../../../pages/HomePage/HomePage";
import StoragePage from "../../../pages/StoragePage/StoragePage";
import ProfilePage from "../../../pages/ProfilePage/ProfilePage";
import AuthPage from "../../../pages/AuthPage/AuthPage";
import PageNotFound from "../../../pages/PageNotFound/PageNotFound";
import FilePage from "../../../pages/StoragePage/FilePage/FilePage";

export const RootPathnames = {
    HOME: "/",
    STORAGE: "/storage",
    PROFILE: "/profile",
};

// If it's not in the RootPathnames, use a redirect (<Redirect/>)!
export const RoutesPathnames = {
    HOME: RootPathnames.HOME,
    STORAGE: RootPathnames.STORAGE,
    FILE: RootPathnames.STORAGE + '/:id',
    PROFILE: RootPathnames.PROFILE,
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
};

export const HOMEROUTE: RouteObject = {
    id: generateId(),
    path: RoutesPathnames.HOME,
    element: <HomePage />,
};

export const STORAGEROUTE: RouteObject = {
    id: generateId(),
    path: RoutesPathnames.STORAGE,
    element: <StoragePage />,
};

export const FILEROUTE: RouteObject = {
    id: generateId(),
    path: RoutesPathnames.FILE,
    element: <FilePage />,
};

export const PROFILEROUTE: RouteObject = {
    id: generateId(),
    path: RoutesPathnames.PROFILE,
    element: <ProfilePage />,
};

export const SIGNINROUTE: RouteObject = {
    id: generateId(),
    path: RoutesPathnames.SIGNIN,
    element: <AuthPage />,
};

export const SIGNUPROUTE: RouteObject = {
    id: generateId(),
    path: RoutesPathnames.SIGNUP,
    element: <AuthPage />,
};

const PAGENOTFOUNDROUTE: RouteObject = {
    id: generateId(),
    path: "*",
    element: <PageNotFound />,
};

export const routes: RouteObject[] = [
    HOMEROUTE,
    STORAGEROUTE,
    PROFILEROUTE,
    FILEROUTE,
    SIGNINROUTE,
    SIGNUPROUTE,

    PAGENOTFOUNDROUTE,
];
