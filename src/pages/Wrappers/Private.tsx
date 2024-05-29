import { FC, PropsWithChildren } from "react";
import { SIGNINROUTE } from "core/Router/routes";

import PageConfig from "./PageConfig";
import { authApi } from "services/authApi";
import { getCookieValue } from "helpers/cookie";
import { cookieKeys } from "types/cookie";

const Private: FC<PropsWithChildren> = ({ children }) => {
	const token = getCookieValue(cookieKeys.TOKEN)
	const getMeData = authApi.useGetMeQuery({}, {skip: !token})
	const isRedirecting = !Boolean(getMeData.currentData?.user);

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
