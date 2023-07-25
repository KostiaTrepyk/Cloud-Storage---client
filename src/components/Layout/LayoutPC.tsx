import { FC } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/PC/Header/Header";
import Sidebar from "./components/PC/Sidebar/Sidebar";

const LayoutPC: FC = () => {
	return (
		<div className="min-h-screen flex bg-neutral-50">
			<Sidebar />

			<div className="w-full flex flex-col">
				<Header />
				<div className="grow flex flex-col w-full pb-3 px-6">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default LayoutPC;
