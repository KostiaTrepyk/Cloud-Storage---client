import { ButtonHTMLAttributes, PropsWithChildren, forwardRef } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Color } from "../types";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";

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
		"bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-black",
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

const Button = forwardRef<HTMLButtonElement, Props>(
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
					"h-full min-w-[5rem] rounded p-2 text-center font-semibold text-white transition",
					color && colorVarinats[color],
					!status && "disabled:bg-neutral-600",
					buttonAtributes.disabled && "contrast-75",
					buttonAtributes.className
				)}
				ref={ref}
			>
				{status === "pending" ? (
					<MLoadIcon
						className="mx-auto aspect-square h-full"
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
						spin
					/>
				) : status === "fulfilled" ? (
					<MSuccessIcon
						className="mx-auto aspect-square h-full text-green-600"
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
					/>
				) : status === "rejected" ? (
					<MErrorIcon
						className="mx-auto h-full animate-pulse text-red-600"
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
					/>
				) : (
					children
				)}
			</button>
		);
	}
);

export default Button;
