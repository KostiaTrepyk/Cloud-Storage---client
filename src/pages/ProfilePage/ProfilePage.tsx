import { useNavigate } from "react-router-dom";
import { SIGNINROUTE } from "../../core/Router/types/routes";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AuthActions } from "../../store/authSlice/authSlice";

import PageConfig from "../Wrappers/PageConfig";
import IconButton from "../../components/UI/Buttons/IconButton";

// Icons
import LogoutIcon from "../../components/SvgIcons/LogoutIcon";
import SwitchAccountIcon from "../../components/SvgIcons/SwitchAccountIcon";

const ProfilePage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const userData = useAppSelector((state) => state.auth.userData);
	const isRedirecting = !Boolean(isAuth && userData);

	function logout() {
		dispatch(AuthActions.logout());
	}

	return (
		<PageConfig
			redirect={{ when: isRedirecting, where: SIGNINROUTE.path! }}
		>
			<main className="pt-2">
				<div className="flex w-fit flex-col gap-4 overflow-hidden p-6 shadow-md max-sm:w-full lg:px-8">
					<h1 className="text-3xl lg:text-4xl">Profile</h1>
					<table className="lg:text-lg">
						<tbody>
							<tr>
								<td className="pr-4 text-left">Id</td>
								<td>{userData?.id}</td>
							</tr>
							<tr>
								<td className="pr-4 text-left">Full name</td>
								<td>{userData?.fullName}</td>
							</tr>
							<tr>
								<td className="pr-4 text-left">Email</td>
								<td>{userData?.email}</td>
							</tr>
						</tbody>
					</table>

					<div className="flex justify-end gap-2">
						<IconButton
							onClick={() => navigate(SIGNINROUTE.path!)}
							title="Switch account"
						>
							<SwitchAccountIcon />
						</IconButton>

						<IconButton
							onClick={logout}
							title="Log out"
						>
							<LogoutIcon />
						</IconButton>
					</div>
				</div>
			</main>
		</PageConfig>
	);
};

export default ProfilePage;
