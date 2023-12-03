import { ButtonHTMLAttributes, PropsWithChildren, forwardRef } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { Color, Variants, colorVariants } from "../types";

import LoadIcon from "../../SvgIcons/LoadIcon";
import SuccessIcon from "../../SvgIcons/SuccessIcon";
import ErrorIcon from "../../SvgIcons/CloseIcon";

/* Framer */
const MSuccessIcon = motion(SuccessIcon);
const MLoadIcon = motion(LoadIcon);
const MErrorIcon = motion(ErrorIcon);

interface Props
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		PropsWithChildren {
	/**  @default "default" */
	color?: Color;

	status?: keyof typeof QueryStatus;

	/**  @default "medium" */
	size?: "small" | "medium" | "large";

	/**  @default "contained" */
	variant?: Variants;
}

/** Fix click animation */
const Button = forwardRef<HTMLButtonElement, Props>(
	(
		{
			color = "neutral",
			status = "uninitialized",
			size = "medium",
			variant = "contained",

			children,
			...buttonAtributes
		},
		ref
	) => {
		return (
			<button
				{...buttonAtributes}
				className={twMerge(
					"relative min-w-[4rem] select-none overflow-hidden rounded text-center font-semibold uppercase text-white transition duration-200",
					"after:visible after:absolute after:left-1/2 after:top-1/2 after:h-[125%] after:w-[125%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-current after:opacity-0 after:transition-all after:duration-1000 after:ease-out after:content-[''] active:after:invisible active:after:h-0 active:after:w-0 active:after:opacity-75 after:active:transition-none",

					colorVariants[variant][color],

					size === "small" && "px-2 py-1.5 text-[0.8125rem]",
					size === "medium" && "px-3 py-2 text-[0.875rem]",
					size === "large" && "px-4 py-3 text-[0.9375rem]",

					variant === "contained" && "",
					variant === "outlined" && "border",
					variant === "text" && "",

					buttonAtributes.disabled && "contrast-75",
					!status && "border-neutral-900 disabled:bg-neutral-600",
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
