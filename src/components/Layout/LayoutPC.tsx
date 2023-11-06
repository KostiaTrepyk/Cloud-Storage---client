import { FC } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/PC/Sidebar/Sidebar";
import ScrollTop from "./components/ScrollTop";

const LayoutPC: FC = () => {
	return (
		<>
			<div className="mx-auto flex min-h-screen max-w-[120rem] bg-white tracking-tight">
				<Sidebar />

				<div className="flex grow pl-36">
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
