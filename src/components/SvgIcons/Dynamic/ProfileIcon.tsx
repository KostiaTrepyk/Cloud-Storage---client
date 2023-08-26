import { SVGAttributes, forwardRef } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";

// Icons
import DefaultProfileIcon from "../ProfileIcons/DefaultProfileIcon";
import ErrorProfileIcon from "../ProfileIcons/ErrorProfileIcon";
import LoadingProfileIcon from "../ProfileIcons/LoadingProfileIcon";
import SuccessProfileIcon from "../ProfileIcons/SuccessProfileIcon";

interface Props extends SVGAttributes<SVGSVGElement> {}

/** Depends on authorization status */
const ProfileIcon = forwardRef<SVGSVGElement, Props>((svgAttrs, ref) => {
	const authStatus = useAppSelector((state) => state.auth.status);
	const isAuth = useAppSelector((state) => state.auth.isAuth);

	return (
		<>
			{!isAuth && authStatus === "uninitialized" && (
				<DefaultProfileIcon {...svgAttrs} ref={ref} />
			)}
			{!isAuth && authStatus === "pending" && (
				<LoadingProfileIcon {...svgAttrs} ref={ref} />
			)}
			{!isAuth && authStatus === "rejected" && (
				<ErrorProfileIcon {...svgAttrs} ref={ref} />
			)}

			{isAuth && <SuccessProfileIcon {...svgAttrs} ref={ref} />}
		</>
	);
});

export default ProfileIcon;
