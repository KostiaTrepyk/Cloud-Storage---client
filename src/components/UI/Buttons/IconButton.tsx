import {
	ButtonHTMLAttributes,
	PropsWithChildren,
	forwardRef,
} from "react";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Color, Variants, colorVariants } from "../types";

import Ripple from "../Ripple/Ripple";

/* Icons */
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
	/** @default "neutral" */
	color?: Color;

	status?: keyof typeof QueryStatus;

	/** @default "contained" */
	variant?: Exclude<Variants, "text">;
}

const IconButton = forwardRef<HTMLButtonElement, Props>(
	(
		{
			color = "neutral",
			variant = "contained",
			status = "uninitialized",

			children,
			...buttonAtributes
		},
		ref
	) => {
		return (
			<button
				{...buttonAtributes}
				className={twMerge(
					`relative aspect-square h-full overflow-hidden rounded-full duration-300 ${colorVariants[variant][color]}`,

					variant === "outlined" ? "border" : "",

					buttonAtributes.disabled && "contrast-75",
					buttonAtributes.className
				)}
				ref={ref}
			>
				<span className="block scale-[.55]">
					{status === "pending" ? (
						<MLoadIcon
							className="animate-[spin_2s_linear_infinite]"
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3 }}
						/>
					) : status === "fulfilled" ? (
						<MSuccessIcon
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3 }}
						/>
					) : status === "rejected" ? (
						<MErrorIcon
							className="ping-[spin_2s_linear_infinite]"
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3 }}
						/>
					) : (
						<>{children}</>
					)}
				</span>

				<Ripple
					color={variant === "contained" ? "white" : color}
					duration={10000000}
				/>
			</button>
		);
	}
);

export default IconButton;
