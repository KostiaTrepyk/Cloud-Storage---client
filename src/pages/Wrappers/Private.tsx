import { FC, PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AUTHROUTE } from "../../core/Router/types/routes";
import { searchParamsFromObj } from "../../helpers/searchParamsFromObj";
import { searchParamsToObj } from "../../helpers/searchParamsToObj";
import { useAppSelector } from "../../hooks/useAppSelector";
import { SearchParamsEnum } from "../../types/searchParamsEnum";

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

    if (!isAuth) return <Navigate to={{ pathname: AUTHROUTE.path!, search: createQueryToRedirect() }} />;

    return <>{children}</>;
};

export default Private;
