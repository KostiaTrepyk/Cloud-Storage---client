import { FC, useState } from "react";
import { HOMEROUTE, PROFILEROUTE, STORAGEROUTE } from "../../../../../core/Router/types/routes";

import SidebarLinks from "./SidebarLinks";

import HomeIcon from "../../../../SvgIcons/HomeIcon";
import StorageIcon from "../../../../SvgIcons/StorageIcon";
import ProfileIcon from "../../../../SvgIcons/ProfileIcon";
import ArrowRightIcon from "../../../../SvgIcons/ArrowRightIcon";

const routes = [
    {
        ...HOMEROUTE,
        label: "Home",
        icon: <HomeIcon />,
    },
    {
        ...STORAGEROUTE,
        label: "Storage",
        icon: <StorageIcon />,
    },
    {
        ...PROFILEROUTE,
        label: "Profile",
        icon: <ProfileIcon />,
    },
];

const Sidebar: FC = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <section>
            <div className="h-14 pl-3 flex justify-end items-center">
                <div
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className={`${isExpanded ? "rotate-180" : "rotate-0"} h-10 w-10 transition duration-300`}
                >
                    <ArrowRightIcon />
                </div>
            </div>

            {/* Dividfer */}
            <div className="w-3/4 border-t-2 border-neutral-700" />

            <nav className="pt-4 pl-3">
                <SidebarLinks routes={routes} isExpanded={isExpanded} />
            </nav>
        </section>
    );
};

export default Sidebar;
