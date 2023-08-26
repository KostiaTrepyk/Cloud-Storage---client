import { FC } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/PC/Sidebar/Sidebar";

const LayoutPC: FC = () => {
	return (
		<div className="flex min-h-screen bg-white tracking-tight">
			<Sidebar />
			<div className="flex grow pl-36">
				<Outlet />
			</div>
		</div>
	);
};

export default LayoutPC;
