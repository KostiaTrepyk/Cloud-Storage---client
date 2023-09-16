import { FC, PropsWithChildren } from "react";
import { SIGNINROUTE } from "../../core/Router/types/routes";
import { useAppSelector } from "../../hooks/useAppSelector";

import PageConfig from "./PageConfig";

const Private: FC<PropsWithChildren> = ({ children }) => {
	const userData = useAppSelector((state) => state.auth.userData);
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const isRedirecting = !Boolean(isAuth && userData);

	return (
		<PageConfig
			navigate={{
				when: isRedirecting,
				where: SIGNINROUTE.path!,
				immediately: true,
			}}
		>
			{children}
		</PageConfig>
	);
};

export default Private;
