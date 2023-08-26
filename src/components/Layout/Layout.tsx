import { FC } from "react";
import { Device, localStorageKeys } from "../../types/localStorage";

import LayoutMobile from "./LayoutMobile";
import LayoutPC from "./LayoutPC";

const Layout: FC = () => {
	const isMobile =
		(localStorage.getItem(localStorageKeys.DEVICE) as Device) === "mobile";

	return <>{isMobile ? <LayoutMobile /> : <LayoutPC />}</>;
};

export default Layout;
