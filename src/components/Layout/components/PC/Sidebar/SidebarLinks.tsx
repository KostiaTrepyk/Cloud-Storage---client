import React from "react";
import { NavLink, RouteObject } from "react-router-dom";
import { Variants, motion } from "framer-motion";
import { usePathname } from "../../../../../hooks/usePathname";

// Framer animations
const linkLabelAnimation: Variants = {
	expanded: {
		width: "auto",
		scale: 1,
		opacity: 1,
		paddingRight: "0.25rem",
		transition: {
			duration: 0.3,
		},
	},
	closed: {
		width: 0,
		scale: 0,
		opacity: 0,
		transition: {
			duration: 0.3,
		},
	},
};

interface Props {
	routes: (RouteObject & { label: string; icon: JSX.Element })[];
	isExpanded: boolean;
}

const SidebarLinks: React.FC<Props> = ({ routes, isExpanded }) => {
	const { current, redirect } = usePathname();

	return (
		<div className="flex flex-col gap-8">
			{routes.map((route) => {
				const isActive =
					route.path === redirect.rootPathname ||
					(route.path === current.rootPathname &&
						!redirect.rootPathname);

				return (
					<React.Fragment key={route.id}>
						<NavLink
							to={route.path!}
							className={`flex flex-row gap-1 transition duration-500 hover:text-rose-600 ${
								isActive && "text-rose-600"
							}`}
						>
							<div className="h-10 w-10">{route.icon}</div>
							<motion.b
								className={`text-md self-end overflow-hidden pb-1 ${
									!isExpanded && "w-0"
								}`}
								animate={isExpanded ? "expanded" : "closed"}
								variants={linkLabelAnimation}
							>
								{route.label}
							</motion.b>
						</NavLink>
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default SidebarLinks;
