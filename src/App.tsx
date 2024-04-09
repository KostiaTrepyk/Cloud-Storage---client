import { Fragment, useEffect } from "react";
import Router from "core/Router/Router";
import setLocalStorage from "core/setLocalStorage";
import { axiosConfig } from "core/Configs/Axios";
import { getMe } from "store/authSlice/reducers/getMe";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { FoldersHistoryContextProvider } from "contexts/FoldersHistoryContext";
import { ContextMenuContextProvider } from "contexts/ContextMenuContext/Provider";

const App = () => {
	const user = useAppSelector((state) => state.auth.userData?.user);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setLocalStorage();
		axiosConfig();
	}, []);

	useEffect(() => {
		dispatch(getMe());
	}, [dispatch]);

	return (
		<Fragment key={user?.email}>
			<ContextMenuContextProvider>
				<FoldersHistoryContextProvider>
					<Router />
				</FoldersHistoryContextProvider>
			</ContextMenuContextProvider>
		</Fragment>
	);
};

export default App;
