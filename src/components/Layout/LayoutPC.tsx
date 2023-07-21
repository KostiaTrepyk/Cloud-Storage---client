import { FC } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/PC/Header/Header";
import Sidebar from "./components/PC/Sidebar/Sidebar";

const LayoutPC: FC = () => {
    return (
        <div className="min-h-screen flex">
            <Sidebar />

            <div className="w-full pb-2 px-6">
                <Header />

                {/* Divider */}
                <div className="w-3/4 mx-auto mb-3 border-neutral-600 border-t-2" />

                <Outlet />
            </div>
        </div>
    );
};

export default LayoutPC;
