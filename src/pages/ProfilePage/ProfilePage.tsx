import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AuthActions } from "../../store/authSlice/authSlice";
import Private from "../Wrappers/Private";

const ProfilePage = () => {
	const dispatch = useAppDispatch();

	function logout() {
		dispatch(AuthActions.logout());
	}

	return (
		<main>
			<h1>ProfilePage component</h1>

			<button onClick={logout}>Log out</button>
		</main>
	);
};

const PrivateProfilePage = () => (
	<Private>
		<ProfilePage />
	</Private>
);
export default PrivateProfilePage;
