import { RouteObject } from "react-router-dom";
import { generateId } from "../helpers/generateId";

// pages
import HomePage from "../../../pages/HomePage/HomePage";
import StoragePage from "../../../pages/StoragePage/StoragePage";
import ProfilePage from "../../../pages/ProfilePage/ProfilePage";
import AuthPage from "../../../pages/AuthPage/AuthPage";
import PageNotFound from "../../../pages/PageNotFound/PageNotFound";
import TrashPage from "../../../pages/TrashPage/TrashPage";

export const RootPathnames = {
	HOME: "/",
	STORAGE: "/storage",
	PROFILE: "/profile",
};

export const RoutesPathnames = {
	HOME: RootPathnames.HOME,
	STORAGE: RootPathnames.STORAGE,
	TRASH: RootPathnames.STORAGE + "/trash",
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

export const TRASHROUTE: RouteObject = {
	id: generateId(),
	path: RoutesPathnames.TRASH,
	element: <TrashPage />,
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
	TRASHROUTE,
	SIGNINROUTE,
	SIGNUPROUTE,

	PAGENOTFOUNDROUTE,
];
