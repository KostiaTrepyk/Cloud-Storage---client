import { RouteObject } from "react-router-dom";
import { generateId } from "../helpers/generateId";

// pages
import HomePage from "../../../pages/HomePage/HomePage";
import StoragePage from "../../../pages/StoragePage/StoragePage";
import ProfilePage from "../../../pages/ProfilePage/ProfilePage";
import AuthPage from "../../../pages/AuthPage/AuthPage";
import PageNotFound from "../../../pages/PageNotFound/PageNotFound";

export const RootPathes = {
    HOMEPATHNAME: "/",
    STORAGEPATHNAME: "/storage",
    PROFILEPATHNAME: "/profile",
};

/* Should start with RootPathes */
export const RoutesPathnames = {
    HOMEPATHNAME: RootPathes.HOMEPATHNAME,
    STORAGEPATHNAME: RootPathes.STORAGEPATHNAME,
    FILESPATHNAME: RootPathes.STORAGEPATHNAME + "/files",
    PROFILEPATHNAME: RootPathes.PROFILEPATHNAME,
    AUTHPATHNAME: RootPathes.PROFILEPATHNAME + "/auth",
};

export const HOMEROUTE: RouteObject = {
    id: generateId(),
    path: RoutesPathnames.HOMEPATHNAME,
    element: <HomePage />,
};

export const STORAGEROUTE: RouteObject = {
    id: generateId(),
    path: RoutesPathnames.STORAGEPATHNAME,
    element: <StoragePage />,
};

export const FILESROUTE: RouteObject = {
    id: generateId(),
    path: RoutesPathnames.FILESPATHNAME,
    element: <StoragePage />,
};

export const PROFILEROUTE: RouteObject = {
    id: generateId(),
    path: RoutesPathnames.PROFILEPATHNAME,
    element: <ProfilePage />,
};

export const AUTHROUTE: RouteObject = {
    id: generateId(),
    path: RoutesPathnames.AUTHPATHNAME,
    element: <AuthPage />,
};

const PAGENOTFOUNDROUTE: RouteObject = {
    id: generateId(),
    path: "*",
    element: <PageNotFound />,
};

export const routes: RouteObject[] = [HOMEROUTE, STORAGEROUTE, AUTHROUTE, PAGENOTFOUNDROUTE, PROFILEROUTE];
