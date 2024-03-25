import { RouteObject } from "react-router-dom";
import { generateId } from "../helpers/generateId";

// pages
import HomePage from "pages/HomePage/HomePage";
import StoragePage from "pages/StoragePage/StoragePage";
import ProfilePage from "pages/ProfilePage/ProfilePage";
import AuthPage from "pages/AuthPage/AuthPage";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import TrashPage from "pages/TrashPage/TrashPage";

export const RootPaths = {
	HOME: "/",
	STORAGE: "/storage",
	PROFILE: "/profile",
};

export const RoutePaths = {
	HOME: RootPaths.HOME,
	STORAGE: RootPaths.STORAGE,
	TRASH: RootPaths.STORAGE + "/trash",
	PROFILE: RootPaths.PROFILE,
	SIGNIN: "/auth/signin",
	SIGNUP: "/auth/signup",
};

export const HOMEROUTE: RouteObject = {
	id: generateId(),
	path: RoutePaths.HOME,
	element: <HomePage />,
};

export const STORAGEROUTE: RouteObject = {
	id: generateId(),
	path: RoutePaths.STORAGE,
	element: <StoragePage />,
};

export const TRASHROUTE: RouteObject = {
	id: generateId(),
	path: RoutePaths.TRASH,
	element: <TrashPage />,
};

export const PROFILEROUTE: RouteObject = {
	id: generateId(),
	path: RoutePaths.PROFILE,
	element: <ProfilePage />,
};

export const SIGNINROUTE: RouteObject = {
	id: generateId(),
	path: RoutePaths.SIGNIN,
	element: <AuthPage />,
};

export const SIGNUPROUTE: RouteObject = {
	id: generateId(),
	path: RoutePaths.SIGNUP,
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
	TRASHROUTE,
	SIGNINROUTE,
	SIGNUPROUTE,

	PAGENOTFOUNDROUTE,
];
