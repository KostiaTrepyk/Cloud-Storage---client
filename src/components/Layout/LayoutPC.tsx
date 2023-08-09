import { FC } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/PC/Header/Header";
import Sidebar from "./components/PC/Sidebar/Sidebar";

const LayoutPC: FC = () => {
	return (
		<div className="flex min-h-screen">
			<Sidebar />

			<div className="flex w-full flex-col">
				<Header />
				<div className="flex w-full grow flex-col bg-neutral-50">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default LayoutPC;
