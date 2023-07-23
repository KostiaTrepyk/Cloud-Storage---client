import { FC } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/PC/Header/Header";
import Sidebar from "./components/PC/Sidebar/Sidebar";

const LayoutPC: FC = () => {
    return (
        <div className="min-h-screen flex bg-neutral-50">
            <Sidebar />

            <div className="w-full">
                <Header />
                <div className="w-full pb-2 px-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default LayoutPC;
