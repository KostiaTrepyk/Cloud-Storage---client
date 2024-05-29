import { Fragment, useEffect } from "react";
import Router from "core/Router/Router";
import setLocalStorage from "core/setLocalStorage";
import { axiosConfig } from "core/Configs/Axios";
import { FoldersHistoryContextProvider } from "contexts/FoldersHistoryContext";
import { ContextMenuContextProvider } from "contexts/ContextMenuContext/Provider";
import { authApi } from "services/authApi";
import { getCookieValue } from "helpers/cookie";
import { cookieKeys } from "types/cookie";

const App = () => {
	const token = getCookieValue(cookieKeys.TOKEN);
	const { currentData } = authApi.useGetMeQuery({}, { skip: !token });

	useEffect(() => {
		setLocalStorage();
		axiosConfig();
	}, []);

	return (
		<Fragment key={currentData?.user.id}>
			<ContextMenuContextProvider>
				<FoldersHistoryContextProvider>
					<Router />
				</FoldersHistoryContextProvider>
			</ContextMenuContextProvider>
		</Fragment>
	);
};

export default App;
