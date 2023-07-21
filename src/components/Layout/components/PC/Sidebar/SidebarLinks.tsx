import React from "react";
import { NavLink, RouteObject } from "react-router-dom";
import { Variants, motion } from "framer-motion";

// Framer animations
const linkLabelAnimation: Variants = {
    expanded: {
        width: "auto",
        scale: 1,
        opacity: 1,
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
    return (
        <div className="flex flex-col gap-8">
            {routes.map((route) => (
                <React.Fragment key={route.id}>
                    <NavLink to={route.path!} className="flex flex-row gap-1">
                        <div className="h-10 w-10">{route.icon}</div>
                        <motion.b
                            className={`${!isExpanded && "w-0 overflow-hidden"} self-end text-lg pb-1`}
                            animate={isExpanded ? "expanded" : "closed"}
                            variants={linkLabelAnimation}
                        >
                            {route.label}
                        </motion.b>
                    </NavLink>
                </React.Fragment>
            ))}
        </div>
    );
};

export default SidebarLinks;
