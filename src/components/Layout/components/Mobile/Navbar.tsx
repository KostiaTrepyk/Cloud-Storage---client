import React from "react";
import { NavLink } from "react-router-dom";
import { HOMEROUTE, STORAGEROUTE, PROFILEROUTE } from "../../../../core/Router/types/routes";

// Icons
import HomeIcon from "../../../SvgIcons/HomeIcon";
import StorageIcon from "../../../SvgIcons/StorageIcon";
import ProfileIcon from "../../../SvgIcons/ProfileIcon";
import { usePathname } from "../../../../hooks/usePathname";

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

const Navbar = () => {
    const { current, redirect } = usePathname();

    return (
        <nav className="w-full h-14 px-1 fixed bottom-0 flex justify-around items-center bg-white shadow-inner">
            {routes.map((route) => {
                const isActive =
                    route.path === redirect.rootPathname ||
                    (route.path === current.rootPathname && !redirect.rootPathname);

                return (
                    <React.Fragment key={route.id}>
                        <NavLink
                            to={route.path!}
                            className={`h-full w-full flex items-center justify-center rounded-t transition duration-500 ease-out ${
                                isActive && "text-rose-500 bg-neutral-100 shadow shadow-rose-500"
                            }`}
                        >
                            <div className="h-8 w-8">{route.icon}</div>
                        </NavLink>
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Navbar;
