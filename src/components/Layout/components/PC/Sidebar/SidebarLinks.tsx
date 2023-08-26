import React from "react";
import { NavLink, RouteObject } from "react-router-dom";
import { usePathname } from "../../../../../hooks/usePathname";

interface Props {
	routes: (RouteObject & { label: string; icon: JSX.Element })[];
}

const SidebarLinks: React.FC<Props> = ({ routes }) => {
	const { current, redirect } = usePathname();

	return (
		<nav className="flex flex-col gap-7">
			{routes.map((route) => {
				const isActive =
					route.path === redirect.rootPathname ||
					(route.path === current.rootPathname &&
						!redirect.rootPathname);

				return (
					<React.Fragment key={route.id}>
						<NavLink
							to={route.path!}
							className={`flex flex-row gap-3 transition duration-500 hover:text-rose-600 ${
								isActive && "text-rose-600"
							}`}
						>
							<div className="h-10 w-10">{route.icon}</div>
							<b className="text-md self-end overflow-hidden pb-1">
								{route.label}
							</b>
						</NavLink>
					</React.Fragment>
				);
			})}
		</nav>
	);
};

export default SidebarLinks;
