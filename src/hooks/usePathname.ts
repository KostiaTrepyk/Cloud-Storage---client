import { useLocation } from "react-router-dom";
import { searchParamsToObj } from "../helpers/searchParamsToObj";
import { SearchParamsEnum } from "../types/searchParamsEnum";
import { RootPathnames, RoutesPathnames } from "../core/Router/types/routes";

export function usePathname() {
	const location = useLocation();
	const searchParams = searchParamsToObj(location.search);
	const currentPathname = location.pathname;

	const redirectTo = searchParams[SearchParamsEnum.REDIRECT];

	const currentRootPathname: string = verifyPathname(currentPathname)
		? getRootPathname(currentPathname)
		: RoutesPathnames.HOME;

	const redirectPathname = verifyPathname(redirectTo) ? redirectTo : null;

	const redirectRootPathname = verifyPathname(redirectTo)
		? getRootPathname(redirectTo)
		: null;

	function verifyPathname(path: string | undefined): boolean {
		if (!path) return false;

		/* example: /profile === /profile/ */
		if (path[path.length - 1] === "/") {
			path = path.slice(0, path.length - 1);
		}

		if (
			Object.values(RootPathnames).includes(getRootPathname(path)) &&
			Object.values(RoutesPathnames).includes(path)
		) {
			return true;
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
