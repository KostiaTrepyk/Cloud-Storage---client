import {
	ButtonHTMLAttributes,
	PropsWithChildren,
	forwardRef,
} from "react";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { twMerge } from "tailwind-merge";
import { Color, Variants, colorVariants } from "../../types";

import Ripple from "../../Animations/Ripple/Ripple";

/* Icons */
import LoadIcon from "../../../SvgIcons/LoadIcon";
import SuccessIcon from "../../../SvgIcons/SuccessIcon";
import ErrorIcon from "../../../SvgIcons/CloseIcon";
import Fade from "components/UI/Animations/Fade/Fade";

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
					`relative aspect-square h-full rounded-full transition duration-300 ${colorVariants[variant][color]}`,

					variant === "outlined" ? "border" : "",

					buttonAtributes.disabled &&
						"cursor-not-allowed contrast-75",

					buttonAtributes.className
				)}
				ref={ref}
			>
				<span className="block scale-[.55] bg-inherit">
					{children}

					{status !== "uninitialized" && (
						<Fade
							className={`absolute left-0 top-0 flex h-full w-full items-center justify-center transition duration-300 ${
								/* To hide children when variant is "outlined" */
								variant === "outlined"
									? "bg-white"
									: "bg-inherit"
							}`}
						>
							{status === "pending" ? (
								<LoadIcon
									className="aspect-square h-full"
									spin
								/>
							) : status === "fulfilled" ? (
								<SuccessIcon className="aspect-square h-full text-green-600" />
							) : (
								status === "rejected" && (
									<ErrorIcon className="aspect-square h-full animate-pulse text-red-600" />
								)
							)}
						</Fade>
					)}
				</span>

				<Ripple
					color={variant === "contained" ? "white" : color}
					borderRadius="50%"
				/>
			</button>
		);
	}
);

export default IconButton;
