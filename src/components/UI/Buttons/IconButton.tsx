import {
	ButtonHTMLAttributes,
	PropsWithChildren,
	forwardRef,
} from "react";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Color } from "../types";

/* Icons */
import LoadIcon from "../../SvgIcons/LoadIcon";
import SuccessIcon from "../../SvgIcons/SuccessIcon";
import ErrorIcon from "../../SvgIcons/CloseIcon";

/* Framer */
const MSuccessIcon = motion(SuccessIcon);
const MLoadIcon = motion(LoadIcon);
const MErrorIcon = motion(ErrorIcon);

const colorVarinats: Record<Color, string> = {
	neutral: "bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500",
	default:
		"bg-neutral-100 backdrop-blur hover:bg-neutral-200 active:bg-neutral-300",
	red: "bg-red-500 hover:bg-red-600 active:bg-red-700",
	amber: "bg-amber-500 hover:bg-amber-600 active:bg-amber-700",
	lime: "bg-lime-500 hover:bg-lime-600 active:bg-lime-700",
	rose: "bg-rose-500 hover:bg-rose-600 active:bg-rose-700",
};

interface Props
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		PropsWithChildren {
	color?: Color;
	status?: keyof typeof QueryStatus;
}

const IconButton = forwardRef<HTMLButtonElement, Props>(
	(
		{
			children,
			color = "default",
			status = "uninitialized",

			...buttonAtributes
		},
		ref
	) => {
		return (
			<button
				{...buttonAtributes}
				className={twMerge(
					`aspect-square h-full rounded-full border duration-300 ${colorVarinats[color]}`,
					buttonAtributes.disabled && "contrast-75",
					buttonAtributes.className
				)}
				ref={ref}
			>
				<motion.span
					className="block scale-[.55]"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					{status === "pending" ? (
						<MLoadIcon className="animate-[spin_2s_linear_infinite]" />
					) : status === "fulfilled" ? (
						<MSuccessIcon />
					) : status === "rejected" ? (
						<MErrorIcon className="ping-[spin_2s_linear_infinite]" />
					) : (
						<>{children}</>
					)}
				</motion.span>
			</button>
		);
	}
);

export default IconButton;
