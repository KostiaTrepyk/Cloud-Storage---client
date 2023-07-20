import { useMemo, useState } from "react";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import {
    AUTHROUTE,
    HOMEROUTE,
    PROFILEROUTE,
    STORAGEROUTE,
    privateRoutes,
} from "../../../../core/Router/types/routes";

import HomeIcon from "../../../../assets/homeIcon.png";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const isAuth = useAppSelector((state) => state.auth.isAuth);

    const routes = useMemo(
        () => [
            {
                ...HOMEROUTE,
                label: "Home",
                icon: HomeIcon,
                isPrivate: privateRoutes.includes(HOMEROUTE),
            },
            {
                ...STORAGEROUTE,
                label: "Storage",
                icon: HomeIcon,
                isPrivate: privateRoutes.includes(STORAGEROUTE),
            },
            {
                ...PROFILEROUTE,
                label: "Profile",
                icon: HomeIcon,
                isPrivate: privateRoutes.includes(PROFILEROUTE),
            },
            {
                ...AUTHROUTE,
                label: "Auth",
                icon: HomeIcon,
                isPrivate: privateRoutes.includes(AUTHROUTE),
            },
        ],
        [isAuth]
    );

    return (
        <section className="p-2">
            <div onClick={() => setIsExpanded((prev) => !prev)}>{isExpanded ? "Close" : "Open"}</div>

            <nav>
                <SidebarLinks routes={routes} isExpanded={isExpanded} />
            </nav>
        </section>
    );
};

export default Sidebar;
