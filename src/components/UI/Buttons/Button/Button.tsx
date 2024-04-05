import { ButtonHTMLAttributes, PropsWithChildren, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { Color, Variants, colorVariants } from "../../types";

import Ripple from "../../Animations/Ripple/Ripple";

/* Icons */
import LoadIcon from "../../../SvgIcons/LoadIcon";
import SuccessIcon from "../../../SvgIcons/SuccessIcon";
import ErrorIcon from "../../../SvgIcons/CloseIcon";
import Fade from "components/UI/Animations/Fade/Fade";

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		PropsWithChildren {
	/**  @default "default" */
	color?: Color;

	status?: keyof typeof QueryStatus;

	/**  @default "medium" */
	size?: "small" | "medium" | "large";

	/**  @default "contained" */
	variant?: Variants;

	startIcon?: JSX.Element;

	endIcon?: JSX.Element;
}

/** Fix click animation */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			color = "light",
			status = "uninitialized",
			size = "medium",
			variant = "contained",
			startIcon,
			endIcon,
			children,
			...buttonAtributes
		},
		ref
	) => {
		return (
			<button
				{...buttonAtributes}
				className={twMerge(
					"relative flex min-w-[4rem] select-none items-center justify-center rounded text-center font-semibold uppercase text-white transition duration-300",

					colorVariants[variant][color],

					size === "small" && "h-8 px-2.5 py-1.5 text-[0.8125rem]",
					size === "medium" && "h-9 px-3 py-2 text-[0.875rem]",
					size === "large" && "h-10 px-4 py-2.5 text-[0.9375rem]",

					variant === "contained" && "",
					variant === "outlined" && "border",
					variant === "text" && "",

					buttonAtributes.disabled && "cursor-not-allowed",
					buttonAtributes.disabled &&
						status === "uninitialized" &&
						"contrast-50",
					buttonAtributes.className
				)}
				ref={ref}
			>
				{startIcon && (
					<div className="mr-2 aspect-square h-full">{startIcon}</div>
				)}

				{children}

				{endIcon && (
					<div className="ml-2 aspect-square h-full">{endIcon}</div>
				)}

				{status !== "uninitialized" && (
					<Fade
						className={`absolute left-0 top-0 flex h-full w-full items-center justify-center rounded transition duration-300`}
					>
						<div className="h-full scale-75 rounded-full bg-neutral-300 bg-opacity-[0.5] p-1">
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
						</div>
					</Fade>
				)}

				<Ripple color={variant === "contained" ? "white" : color} />
			</button>
		);
	}
);

export default Button;
