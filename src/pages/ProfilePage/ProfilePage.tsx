import { useLocation, useNavigate } from "react-router-dom";
import { SIGNINROUTE } from "../../core/Router/types/routes";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AuthActions } from "../../store/authSlice/authSlice";
import { createRedirectQuery } from "../../helpers/createRedirectQuery";

import IconButton from "../../components/UI/Buttons/IconButton";
import Progress from "../../components/UI/Progress";

import LogoutIcon from "../../components/SvgIcons/LogoutIcon";
import SwitchAccountIcon from "../../components/SvgIcons/SwitchAccountIcon";
import Private from "../Wrappers/Private";

const ProfilePage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const userData = useAppSelector((state) => state.auth.userData);

	const userTotalFileSize = userData?.totalFileSize! / 1024 / 1024; /* MB */
	const maxTotalFileSize = 100; /* MB */
	const totalSizePercentage = Number(
		((userTotalFileSize / maxTotalFileSize) * 100).toFixed(1)
	);

	function switchAccountBtnHandler() {
		navigate(
			SIGNINROUTE.path! +
				createRedirectQuery(location.pathname, location.search)
		);
	}

	function logoutBtnHandler() {
		dispatch(AuthActions.logout());
	}

	return (
		<main className="px-3 pb-3 pt-2">
			<div className="flex w-full max-w-lg flex-col gap-4 overflow-hidden p-6 shadow-md md:px-8">
				<h1 className="text-xl md:text-2xl">Profile</h1>
				<table className="md:text-lg">
					<tbody>
						<tr>
							<td className="pr-4 text-left">Full name</td>
							<td>{userData?.user.fullName}</td>
						</tr>
						<tr>
							<td className="pr-4 text-left">Email</td>
							<td>{userData?.user.email}</td>
						</tr>
						<tr>
							<td className="pr-4 text-left">Created at</td>
							<td>
								{userData
									? new Date(
											userData?.user.createdAt
									  ).toDateString()
									: "-"}
							</td>
						</tr>
						<tr>
							<td className="pr-4 text-left">
								Quantity of files
							</td>
							<td>{userData?.filesCount}</td>
						</tr>
						<tr>
							<td className="pr-4 text-left">Memory remaining</td>
							<td>
								<Progress
									value={totalSizePercentage}
									size={4}
								/>
							</td>
						</tr>
						<tr>
							<td className="pr-4 text-left">
								Average file size
							</td>
							<td>
								{(
									userData?.averageFileSize! /
									1024 /
									1024
								).toFixed(1)}{" "}
								MB
							</td>
						</tr>
					</tbody>
				</table>

				<div className="flex h-10 justify-end gap-2">
					<IconButton
						onClick={switchAccountBtnHandler}
						title="Switch account"
					>
						<SwitchAccountIcon />
					</IconButton>

					<IconButton
						onClick={logoutBtnHandler}
						title="Log out"
					>
						<LogoutIcon />
					</IconButton>
				</div>
			</div>
		</main>
	);
};

const PrivateProfilePage = () => {
	return (
		<Private>
			<ProfilePage />
		</Private>
	);
};

export default PrivateProfilePage;
