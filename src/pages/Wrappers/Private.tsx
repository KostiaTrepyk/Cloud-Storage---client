import { FC, PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { SIGNINROUTE } from "../../core/Router/types/routes";
import { searchParamsFromObj } from "../../helpers/searchParamsFromObj";
import { searchParamsToObj } from "../../helpers/searchParamsToObj";
import { useAppSelector } from "../../hooks/useAppSelector";
import { SearchParamsEnum } from "../../types/searchParamsEnum";

/**
 * @example
 * const Component = ()=>{
 *  return <>Hi!</>;
 * }
 * const PrivateComponent = ()=>(
 *   <Private>
 * 	  <Component/>
 *   </Private>
 * );
 */
const Private: FC<PropsWithChildren> = ({ children }) => {
	const location = useLocation();

	const isAuth = useAppSelector((state) => state.auth.isAuth);

	const createQueryToRedirect = (): string => {
		let query: string = "";
		if (location.search) {
			query = JSON.stringify(searchParamsToObj(location.search));
		}

		return searchParamsFromObj({
			[SearchParamsEnum.REDIRECT]: location.pathname,
			[SearchParamsEnum.QUERY]: query,
		});
	};

	if (!isAuth)
		return (
			<Navigate
				to={{
					pathname: SIGNINROUTE.path!,
					search: createQueryToRedirect(),
				}}
			/>
		);

	return <>{children}</>;
};

export default Private;
