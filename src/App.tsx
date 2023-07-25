import { useEffect } from "react";
import Router from "./core/Router/Router";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { getMe } from "./store/authSlice/reducers/getMe";
import { axiosConfig } from "./core/Configs/Axios";

const App = () => {
	const dispatch = useAppDispatch();

	axiosConfig();

	useEffect(() => {
		dispatch(getMe());
	}, [dispatch]);

	return <Router />;
};

export default App;
