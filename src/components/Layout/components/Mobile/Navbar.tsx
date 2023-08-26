import React from "react";
import { NavLink } from "react-router-dom";
import {
	HOMEROUTE,
	STORAGEROUTE,
	PROFILEROUTE,
} from "../../../../core/Router/types/routes";
import { usePathname } from "../../../../hooks/usePathname";

// Icons
import HomeIcon from "../../../SvgIcons/HomeIcon";
import StorageIcon from "../../../SvgIcons/StorageIcon";
import ProfileIcon from "../../../SvgIcons/Dynamic/ProfileIcon";

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
		<nav className="fixed bottom-0 z-50 flex h-14 w-full items-center justify-around border-t border-neutral-200 bg-white px-1">
			{routes.map((route) => {
				const isActive =
					route.path === redirect.rootPathname ||
					(route.path === current.rootPathname &&
						!redirect.rootPathname);

				return (
					<React.Fragment key={route.id}>
						<NavLink
							to={route.path!}
							className={`flex h-full w-full items-center justify-center rounded-t transition duration-500 ease-out ${
								isActive && "text-rose-500"
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
