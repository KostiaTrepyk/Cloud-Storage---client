import { FC } from "react";
import {
	HOMEROUTE,
	PROFILEROUTE,
	STORAGEROUTE,
} from "core/Router/routes";
import { Link } from "react-router-dom";

import SidebarLinks from "./SidebarLinks";

import Logo from "assets/Logo.webp";
import HomeIcon from "components/SvgIcons/HomeIcon";
import StorageIcon from "components/SvgIcons/StorageIcon";
import ProfileIcon from "components/SvgIcons/Dynamic/ProfileIcon";

const Sidebar: FC = () => {
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

	return (
		<aside className="fixed left-0 top-0 h-screen w-36 pb-4 pl-3 pr-2 pt-3">
			<Link
				className="mb-8 flex items-center gap-3"
				to={HOMEROUTE.path!}
			>
				<img
					className="aspect-square h-10 rounded-full"
					src={Logo}
					alt="Logo"
				/>
				<span className="text-lg font-bold tracking-tighter text-neutral-900">
					FileVault
				</span>
			</Link>
			<SidebarLinks routes={routes} />
		</aside>
	);
};

export default Sidebar;
