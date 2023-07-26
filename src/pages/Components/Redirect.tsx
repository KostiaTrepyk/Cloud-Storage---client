import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RoutesPathnames, HOMEROUTE } from "../../core/Router/types/routes";
import { searchParamsFromObj } from "../../helpers/searchParamsFromObj";
import { SearchParamsEnum } from "../../types/searchParamsEnum";
import { searchParamsToObj } from "../../helpers/searchParamsToObj";

const Redirect: FC = () => {
	const location = useLocation();
	const searchParams = searchParamsToObj(location.search);

	return (
		<Navigate
			to={{
				pathname: getRedirectUrl(searchParams),
				search: getRedirectQuery(searchParams),
			}}
		/>
	);
};

export default Redirect;

function getRedirectUrl(searchParams: Record<string, string>): string {
	let redirectUrl = searchParams[SearchParamsEnum.REDIRECT];

	if (!redirectUrl) return HOMEROUTE.path!;

	/* example: /profile === /profile/ */
	if (redirectUrl[redirectUrl.length - 1] === "/") {
		redirectUrl = redirectUrl.slice(0, redirectUrl.length - 1);
	}

	if (Object.values(RoutesPathnames).includes(redirectUrl)) {
		return redirectUrl;
	}

	return HOMEROUTE.path!;
}

function getRedirectQuery(searchParams: Record<string, string>): string {
	if (!searchParams[SearchParamsEnum.QUERY]) return "";

	let query: string = "";
	try {
		return searchParamsFromObj(
			/* %22 === " */
			JSON.parse(
				searchParams[SearchParamsEnum.QUERY].replaceAll("%22", '"')
			)
		);
	} catch (error) {
		console.error(error);
	}

	return query;
}