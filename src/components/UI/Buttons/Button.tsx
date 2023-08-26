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
	red: "bg-red-600 hover:bg-red-700 active:bg-red-800",
	amber: "bg-amber-600 hover:bg-amber-700 active:bg-amber-800",
	lime: "bg-lime-600 hover:bg-lime-700 active:bg-lime-800",
	rose: "bg-rose-600 hover:bg-rose-700 active:bg-rose-800",
};

interface Props
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		PropsWithChildren {
	color?: Color;
	status?: keyof typeof QueryStatus;
}

const Button = forwardRef<HTMLButtonElement, Props>(
	({ children, color = "default", status, ...buttonAtributes }, ref) => {
		return (
			<button
				{...buttonAtributes}
				className={twMerge(
					"h-full min-w-[5rem] rounded p-2 text-center font-semibold text-white transition disabled:bg-neutral-600",
					color && colorVarinats[color],
					buttonAtributes.className
				)}
				ref={ref}
			>
				{status === "pending" ? (
					<MLoadIcon
						className="mx-auto aspect-square h-full animate-[spin_2s_linear_infinite]"
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
					/>
				) : status === "fulfilled" ? (
					<MSuccessIcon
						className="mx-auto aspect-square h-full"
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
					/>
				) : status === "rejected" ? (
					<MErrorIcon
						className="ping-[spin_2s_linear_infinite] mx-auto h-full"
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
