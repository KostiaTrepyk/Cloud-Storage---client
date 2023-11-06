import { Outlet } from "react-router-dom";

import Header from "./components/Mobile/Header";
import Navbar from "./components/Mobile/Navbar";
import ScrollTop from "./components/ScrollTop";

const LayoutMobile = () => {
	return (
		<>
			<div className="flex min-h-screen flex-col pb-14 tracking-tight">
				<Header />

				<Outlet />

				<Navbar />
			</div>

			<ScrollTop
				size={10}
				bottom={18}
			/>
		</>
	);
};

export default LayoutMobile;
