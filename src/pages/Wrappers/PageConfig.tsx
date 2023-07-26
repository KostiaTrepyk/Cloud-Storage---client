import { FC, PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { SIGNINROUTE } from "../../core/Router/types/routes";
import { createRedirectQuery } from "../../helpers/createRedirectQuery";

interface Props {
	redirect: {
		when: boolean;
		where: string;
	};
}

/**
 * @example
 * const Component = ()=>{
 * const isAuth = false;
 *   return <PageConfig redirect={{when: !isAuth, where: "/auth/signin"}}>Hi!</PageConfig>;
 * }
 */
const PageConfig: FC<PropsWithChildren<Props>> = ({ redirect, children }) => {
	const location = useLocation();

	if (redirect.when)
		return (
			<Navigate
				to={{
					pathname: SIGNINROUTE.path!,
					search: createRedirectQuery(
						location.pathname,
						location.search
					),
				}}
			/>
		);

	return <>{children}</>;
};

export default PageConfig;
