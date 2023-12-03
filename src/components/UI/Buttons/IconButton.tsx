import {
	ButtonHTMLAttributes,
	PropsWithChildren,
	forwardRef,
} from "react";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Color, Variants, colorVariants } from "../types";

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
					`relative aspect-square h-full overflow-hidden rounded-full border duration-300 ${colorVariants[variant][color]}`,
					"after:visible after:absolute after:left-1/2 after:top-1/2 after:h-[100%] after:w-[100%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-current after:opacity-0 after:transition-all after:duration-700 after:ease-out after:content-[''] active:after:invisible active:after:h-0 active:after:w-0 active:after:opacity-75 after:active:transition-none",

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
