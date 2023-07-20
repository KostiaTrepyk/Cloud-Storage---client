import { FC, PropsWithChildren } from "react";

import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex text-neutral-100 bg-neutral-900 ">
            <Sidebar />
            <div className="min-h-screen w-full">
                <Navbar />

                {/* Divider */}
                <div className="w-3/4 mx-auto border-neutral-600 border-t" />

                <div className="p-2">
                    <Outlet />
                </div>

                {/* Divider */}
                <div className="w-3/4 mx-auto border-neutral-600 border-t" />

                <Footer />
            </div>
        </div>
    );
};

export default Layout;
