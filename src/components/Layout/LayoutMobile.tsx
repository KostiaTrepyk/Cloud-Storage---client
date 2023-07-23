import { Outlet } from "react-router-dom";

import Header from "./components/Mobile/Header";
import Navbar from "./components/Mobile/Navbar";

const LayoutMobile = () => {
    return (
        <div className="min-h-screen pb-14 flex flex-col">
            <Header />

            <div className="grow px-3 py-2 bg-neutral-100">
                <Outlet />
            </div>

            <Navbar />
        </div>
    );
};

export default LayoutMobile;
