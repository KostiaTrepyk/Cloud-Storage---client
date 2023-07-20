import React from "react";
import { NavLink, RouteObject } from "react-router-dom";
import { Variants, motion } from "framer-motion";
import { useAppSelector } from "../../../../hooks/useAppSelector";

// Framer animations
const linkAnimation: Variants = {
    expanded: {
        scale: 1,
        width: "auto",
        opacity: 1,
    },
    closed: {
        scale: 0,
        width: 0,
        opacity: 0,
    },
};

interface Props {
    routes: (RouteObject & { label: string; icon: string; isPrivate: boolean })[];
    isExpanded: boolean;
}

const SidebarLinks: React.FC<Props> = ({ routes, isExpanded }) => {
    const isAuth = useAppSelector((state) => state.auth.isAuth);

    return (
        <div className="flex flex-col gap-2">
            {routes.map((route) => (
                <React.Fragment key={route.id}>
                    {(!route.isPrivate || (route.isPrivate && isAuth)) && (
                        <NavLink to={route.path!} className="flex flex-row items-center gap-1">
                            <img src={route.icon} alt="" height={35} width={35} />
                            <motion.span
                                animate={isExpanded ? "expanded" : "closed"}
                                variants={linkAnimation}
                            >
                                {route.label}
                            </motion.span>
                        </NavLink>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default SidebarLinks;
