import { useAppSelector } from "../../../hooks/useAppSelector";

// Icons
import DefaultProfileIcon from "../../SvgIcons/ProfileIcons/DefaultProfileIcon";
import ErrorProfileIcon from "../../SvgIcons/ProfileIcons/ErrorProfileIcon";
import LoadingProfileIcon from "../../SvgIcons/ProfileIcons/LoadingProfileIcon";
import SuccessProfileIcon from "../../SvgIcons/ProfileIcons/SuccessProfileIcon";

/** Depends on authorization status */
const ProfileIcon = () => {
	const authStatus = useAppSelector((state) => state.auth.status);

	return (
		<>
			{authStatus === "idle" && <DefaultProfileIcon />}
			{authStatus === "pending" && <LoadingProfileIcon />}
			{authStatus === "fulfilled" && <SuccessProfileIcon />}
			{authStatus === "rejected" && <ErrorProfileIcon />}
		</>
	);
};

export default ProfileIcon;
