import { FC, useState } from "react";
import {
	HOMEROUTE,
	PROFILEROUTE,
	STORAGEROUTE,
} from "../../../../../core/Router/types/routes";

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
		<section className="sticky top-0 z-10 h-screen bg-white pr-2 shadow-md">
			<div className="flex h-14 items-center justify-end pl-3">
				<button
					onClick={() => setIsExpanded((prev) => !prev)}
					className={`h-10 w-10 rounded-full transition duration-300 hover:bg-neutral-200 active:bg-neutral-500 ${
						isExpanded ? "rotate-180" : "rotate-0"
					}`}
				>
					<ArrowRightIcon />
				</button>
			</div>

			{/* Dividfer */}
			<div className="w-3/4 border-t-2 border-rose-900" />

			<nav className="pl-3 pt-7">
				<SidebarLinks
					routes={routes}
					isExpanded={isExpanded}
				/>
			</nav>
		</section>
	);
};

export default Sidebar;
