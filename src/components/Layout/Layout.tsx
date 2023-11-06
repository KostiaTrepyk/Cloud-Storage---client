import { FC } from "react";
import { getDevice } from "../../helpers/getDevice";

import LayoutMobile from "./LayoutMobile";
import LayoutPC from "./LayoutPC";

const Layout: FC = () => {
	const isMobile = getDevice() === "mobile";

	return <>{isMobile ? <LayoutMobile /> : <LayoutPC />}</>;
};

export default Layout;
