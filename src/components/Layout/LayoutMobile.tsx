import { Outlet } from "react-router-dom";

import Header from "./components/Mobile/Header";
import Navbar from "./components/Mobile/Navbar";

const LayoutMobile = () => {
	return (
		<div className="flex min-h-screen flex-col pb-14 tracking-tight">
			<Header />

			<Outlet />

			<Navbar />
		</div>
	);
};

export default LayoutMobile;
