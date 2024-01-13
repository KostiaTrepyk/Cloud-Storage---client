import { FC, PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { SIGNINROUTE } from "core/Router/types/routes";
import { createRedirectQuery } from "helpers/createRedirectQuery";
import { searchParamsToObj } from "helpers/searchParamsToObj";
import { SearchParamsEnum } from "types/searchParamsEnum";

import Redirect from "./Components/Redirect";

interface Props {
	navigate?: {
		when: boolean;
		where: string;
		immediately?: boolean;
	};
	redirect?: {
		when: boolean;
		immediately?: {
			when: boolean;
		};
	};
}

/**
 * @example
 * const Component = ()=>{
 * const isAuth = false;
 *   return <PageConfig redirect={{when: !isAuth, where: "/auth/signin"}}>Hi!</PageConfig>;
 * }
 */
const PageConfig: FC<PropsWithChildren<Props>> = ({
	navigate,
	redirect,
	children,
}) => {
	const location = useLocation();
	const searcParams = searchParamsToObj(location.search);

	if (
		redirect &&
		((searcParams[SearchParamsEnum.IMMEDIATELY] &&
			redirect.immediately?.when) ||
			redirect.when)
	) {
		return <Redirect />;
	}

	if (navigate && navigate.when)
		return (
			<Navigate
				to={{
					pathname: SIGNINROUTE.path!,
					search: createRedirectQuery(
						location.pathname,
						location.search,
						navigate.immediately
					),
				}}
			/>
		);

	return <>{children}</>;
};

export default PageConfig;
