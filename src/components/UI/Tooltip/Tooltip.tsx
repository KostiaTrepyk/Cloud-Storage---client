
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge";
import useKeyPress from "hooks/useKeyPress";

interface TooltipProps extends React.PropsWithChildren {
	title: string;

	/** @default "bottom-center" */
	position?:
		| "top-start"
		| "top-center"
		| "top-end"
		| "right-start"
		| "right-center"
		| "right-end"
		| "bottom-start"
		| "bottom-center"
		| "bottom-end"
		| "left-start"
		| "left-center"
		| "left-end";
	/** @default false */
	disableArrow?: boolean;
	variant?: "outlined" | "contained";
	className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
	title,
	position = "bottom-center",
	className = "",
	disableArrow = false,
	variant = "contained",
	children,
}) => {
	const [hidden, setHidden] = useState<boolean>(true);
	const isEscapePressed = useKeyPress("Escape");

	let positionClass: string = "";
	let arrowPositionClass: string = "";

	switch (position) {
		case "right-center":
			positionClass = "left-full top-1/2 -translate-y-1/2 ml-2";
			arrowPositionClass =
				"top-1/2 -left-[0.5px] -translate-x-1/2 -translate-y-1/2";
			if (variant === "outlined")
				arrowPositionClass += " border-b border-l";
			break;

		case "top-center":
			positionClass = "bottom-full left-1/2 -translate-x-1/2 mb-2";
			arrowPositionClass =
				"-bottom-[0.5px] translate-y-1/2 left-1/2 -translate-x-1/2";
			if (variant === "outlined")
				arrowPositionClass += " border-b border-r";
			break;

		case "bottom-center":
			positionClass = "top-full left-1/2 -translate-x-1/2 mt-2";
			arrowPositionClass =
				"-top-[0.5px] -translate-y-1/2 left-1/2 -translate-x-1/2";
			if (variant === "outlined")
				arrowPositionClass += " border-t border-l";
			break;

		case "left-center":
			positionClass = "right-full top-1/2 -translate-y-1/2 mr-2";
			arrowPositionClass =
				"top-1/2 -right-[0.5px] translate-x-1/2 -translate-y-1/2";
			if (variant === "outlined")
				arrowPositionClass += " border-t border-r";
			break;

		case "right-start":
			positionClass = "left-full top-0 ml-2";
			arrowPositionClass = "top-2 -left-[0.5px] -translate-x-1/2";
			if (variant === "outlined")
				arrowPositionClass += " border-b border-l";
			break;

		case "right-end":
			positionClass = "left-full bottom-0 ml-2";
			arrowPositionClass = "bottom-2 -left-[0.5px] -translate-x-1/2";
			if (variant === "outlined")
				arrowPositionClass += " border-b border-l";
			break;

		case "left-start":
			positionClass = "right-full top-0 mr-2";
			arrowPositionClass = "top-2 -right-[0.5px] translate-x-1/2";
			if (variant === "outlined")
				arrowPositionClass += " border-t border-r";
			break;

		case "left-end":
			positionClass = "right-full bottom-0 mr-2";
			arrowPositionClass = "bottom-2 -right-[0.5px] translate-x-1/2";
			if (variant === "outlined")
				arrowPositionClass += " border-t border-r";
			break;

		case "top-start":
			positionClass = "bottom-full left-0 mb-2";
			arrowPositionClass = "-bottom-[0.5px] left-2 translate-y-1/2";
			if (variant === "outlined")
				arrowPositionClass += " border-b border-r";
			break;

		case "top-end":
			positionClass = "bottom-full right-0 mb-2";
			arrowPositionClass = "-bottom-[0.5px] right-2 translate-y-1/2";
			if (variant === "outlined")
				arrowPositionClass += " border-b border-r";
			break;

		case "bottom-start":
			positionClass = "top-full left-0 mt-2";
			arrowPositionClass = "-top-[0.5px] left-2 -translate-y-1/2";
			if (variant === "outlined")
				arrowPositionClass += " border-t border-l";
			break;

		case "bottom-end":
			positionClass = "top-full right-0 mt-2";
			arrowPositionClass = "-top-[0.5px] right-2 -translate-y-1/2";
			if (variant === "outlined")
				arrowPositionClass += " border-t border-l";
			break;

		default:
			break;
	}

	useEffect(() => {
		if (isEscapePressed && !hidden) {
			setHidden(true);
		}
	}, [isEscapePressed, hidden]);

	return (
		<div
			className={twMerge("relative w-max", className)}
			onMouseEnter={() => setHidden(false)}
			onMouseLeave={() => setHidden(true)}
			onClick={() => setHidden(true)}
		>
			{children}

			{!hidden && (
				<motion.div
					className={twMerge(
						"absolute z-50 h-fit w-max max-w-xs rounded border border-neutral-200 bg-neutral-200 px-2 py-1.5",
						variant === "outlined" && "border-neutral-400",
						positionClass
					)}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					role="tooltip"
				>
					{title}
					{!disableArrow && (
						<div
							className={twMerge(
								"absolute h-2.5 w-2.5 rotate-45 border border-neutral-200 bg-neutral-200",
								variant === "outlined" &&
									"border-0 border-neutral-400",
								arrowPositionClass
							)}
						></div>
					)}
				</motion.div>
			)}
		</div>
	);
};

export default Tooltip;
