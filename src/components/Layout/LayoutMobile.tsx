import { Outlet } from "react-router-dom";

import Header from "./components/Mobile/Header";
import Navbar from "./components/Mobile/Navbar";

const LayoutMobile = () => {
	return (
		<div className="flex min-h-screen flex-col pb-14">
			<Header />

			<div className="flex grow flex-col bg-neutral-100 px-3 pb-3 pt-2">
				<Outlet />
			</div>

			<Navbar />
		</div>
	);
};

export default LayoutMobile;
