import { useLocation } from "react-router-dom";
import { searchParamsToObj } from "helpers/searchParamsToObj";
import { SearchParamsEnum } from "types/searchParamsEnum";
import { RootPaths, RoutePaths } from "core/Router/types/routes";

export function usePathname() {
	const location = useLocation();
	const searchParams = searchParamsToObj(location.search);
	const currentPathname = location.pathname;

	const redirectTo = searchParams[SearchParamsEnum.REDIRECT];

	const currentRootPathname: string =
		verifyPathname(currentPathname) &&
		Object.values(RootPaths).includes(getRootPathname(currentPathname))
			? getRootPathname(currentPathname)
			: RoutePaths.HOME;

	const redirectPathname = verifyPathname(redirectTo) ? redirectTo : null;

	const redirectRootPathname =
		verifyPathname(redirectTo) &&
		Object.values(RootPaths).includes(getRootPathname(redirectTo))
			? getRootPathname(redirectTo)
			: null;

	function verifyPathname(path: string | undefined): boolean {
		if (!path) return false;

		/* example: /profile === /profile/ */
		if (path[path.length - 1] === "/") {
			path = path.slice(0, path.length - 1);
		}

		const availableRoutes = Object.values(RoutePaths).map((route) =>
			route
				.split("/")
				.slice(1)
				.map((s) => (s.includes(":") ? "*" : s))
		);
		const currentRoute = path.split("/").slice(1);
		// console.log(availableRoutes);

		for (const route of availableRoutes) {
			for (let i = 0; i < currentRoute.length && i < route.length; i++) {
				if (route[i] !== currentRoute[i] && route[i] !== "*") break;

				const isLastIteration =
					currentRoute.length === route.length &&
					currentRoute.length === i + 1;

				if (isLastIteration) {
					return true;
				}
			}
		}

		return false;
	}

	function getRootPathname(path: string | undefined): string {
		if (!path) return "";
		return "/" + path.split("/")[1];
	}

	return {
		current: {
			pathname: currentPathname,
			rootPathname: currentRootPathname,
		},
		redirect: {
			pathname: redirectPathname,
			rootPathname: redirectRootPathname,
		},
	};
}
