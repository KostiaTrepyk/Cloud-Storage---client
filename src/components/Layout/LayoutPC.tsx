import { FC } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/PC/Sidebar/Sidebar";
import ScrollTop from "./components/ScrollTop";

const LayoutPC: FC = () => {
	return (
		<>
			<div className="relative mx-auto flex min-h-screen bg-white tracking-tight">
				<Sidebar />

				<div className="flex grow pl-48">
					<Outlet />
				</div>
			</div>

			<ScrollTop
				size={12}
				bottom={10}
			/>
		</>
	);
};

export default LayoutPC;
