import { useLocation, useNavigate } from "react-router-dom";
import { SIGNINROUTE } from "core/Router/routes";
import { useAppDispatch } from "hooks/useAppDispatch";
import { createRedirectQuery } from "helpers/createRedirectQuery";
import { deleteCookieByName, getCookieValue } from "helpers/cookie";
import { authApi } from "services/authApi";
import { cookieKeys } from "types/cookie";

import Private from "../Wrappers/Private";
import IconButton from "components/UI/Buttons/IconButton/IconButton";
import Tooltip from "components/UI/Tooltip/Tooltip";
import LogoutIcon from "components/SvgIcons/LogoutIcon";
import SwitchAccountIcon from "components/SvgIcons/SwitchAccountIcon";


const ProfilePage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const token = getCookieValue(cookieKeys.TOKEN)
	const { currentData } = authApi.useGetMeQuery({}, {skip: !token});

	function switchAccountBtnHandler() {
		navigate(
			SIGNINROUTE.path! +
				createRedirectQuery(location.pathname, location.search)
		);
	}

	function logoutBtnHandler() {
		deleteCookieByName(cookieKeys.TOKEN, {path: '/'});
		dispatch(authApi.util.resetApiState());
	}

	return (
		<main className="px-3 pb-3 pt-2">
			<div className="flex w-full max-w-lg flex-col gap-4 p-6 shadow-md md:px-8">
				<h1 className="text-xl md:text-2xl">Profile</h1>
				<table className="md:text-lg">
					<tbody>
						<tr>
							<td className="pr-4 text-left">Full name</td>
							<td>{currentData?.user.fullName}</td>
						</tr>
						<tr>
							<td className="pr-4 text-left">Email</td>
							<td>{currentData?.user.email}</td>
						</tr>
						<tr>
							<td className="pr-4 text-left">Created at</td>
							<td>
								{currentData
									? new Date(
										currentData?.user.createdAt
									  ).toDateString()
									: "-"}
							</td>
						</tr>
						<tr>
							<td className="pr-4 text-left">
								Quantity of files
							</td>
							<td>{currentData?.statistic.filesCount}</td>
						</tr>
						<tr>
							<td className="pr-4 text-left">
								Average file size
							</td>
							<td>
								{(
									currentData?.statistic.averageFileSize! /
									1024 /
									1024
								).toFixed(1)}
								MB
							</td>
						</tr>
					</tbody>
				</table>

				<div className="flex h-10 justify-end gap-2">
					<Tooltip
						title="Switch account"
						className="aspect-square h-full"
					>
						<IconButton
							onClick={switchAccountBtnHandler}
							variant="outlined"
						>
							<SwitchAccountIcon />
						</IconButton>
					</Tooltip>

					<Tooltip
						title="Log out"
						className="aspect-square h-full"
					>
						<IconButton
							onClick={logoutBtnHandler}
							variant="outlined"
						>
							<LogoutIcon />
						</IconButton>
					</Tooltip>
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
