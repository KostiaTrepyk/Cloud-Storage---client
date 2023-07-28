import { useAppSelector } from "../../../hooks/useAppSelector";

// Icons
import DefaultProfileIcon from "../ProfileIcons/DefaultProfileIcon";
import ErrorProfileIcon from "../ProfileIcons/ErrorProfileIcon";
import LoadingProfileIcon from "../ProfileIcons/LoadingProfileIcon";
import SuccessProfileIcon from "../ProfileIcons/SuccessProfileIcon";

/** Depends on authorization status */
const ProfileIcon = () => {
	const authStatus = useAppSelector((state) => state.auth.status);
	const isAuth = useAppSelector((state) => state.auth.isAuth);

	return (
		<>
			{!isAuth && authStatus === "idle" && <DefaultProfileIcon />}
			{!isAuth && authStatus === "pending" && <LoadingProfileIcon />}
			{!isAuth && authStatus === "rejected" && <ErrorProfileIcon />}

			{isAuth && <SuccessProfileIcon />}
		</>
	);
};

export default ProfileIcon;
