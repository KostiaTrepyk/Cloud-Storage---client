
import { useState } from "react";
import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge";

interface TooltipProps extends React.PropsWithChildren {
	title: string;

	className?: string;
	position?:
		| "right-center"
		| "right-start"
		| "right-end"
		| "left-center"
		| "left-start"
		| "left-end"
		| "top-center"
		| "top-start"
		| "top-end"
		| "bottom-center"
		| "bottom-start"
		| "bottom-end";
}

const Tooltip: React.FC<TooltipProps> = ({
	title,
	className = "",
	position = "bottom-center",
	children,
}) => {
	const [hidden, setHidden] = useState<boolean>(true);

	let positionClass = "";

	switch (position) {
		case "right-center":
			positionClass =
				"left-full top-1/2 -translate-y-1/2 translate-x-1 ml-1";
			break;
		case "top-center":
			positionClass =
				"bottom-full left-1/2 -translate-x-1/2 -translate-y-0.5 mb-1";
			break;
		case "bottom-center":
			positionClass =
				"top-full left-1/2 -translate-x-1/2 translate-y-0.5 mt-1";
			break;
		case "left-center":
			positionClass =
				"right-full top-1/2 -translate-y-1/2 -translate-x-1 mr-1";
			break;
		case "right-start":
			positionClass = "left-full top-0 ml-1";
			break;
		case "right-end":
			positionClass = "left-full bottom-0 ml-1";
			break;
		case "left-start":
			positionClass = "right-full top-0 mr-1";
			break;
		case "left-end":
			positionClass = "right-full bottom-0 mr-1";
			break;
		case "top-start":
			positionClass = "bottom-full left-0 mb-1";
			break;
		case "top-end":
			positionClass = "bottom-full right-0 mb-1";
			break;
		case "bottom-start":
			positionClass = "top-full left-0 mt-1";
			break;
		case "bottom-end":
			positionClass = "top-full right-0 mt-1";
			break;
		default:
			positionClass =
				"top-full left-1/2 -translate-x-1/2 translate-y-0.5 mt-1";
			break;
	}

	return (
		<div
			className={twMerge("relative w-max", className)}
			onMouseEnter={() => setHidden(false)}
			onMouseLeave={() => setHidden(true)}
		>
			{children}

			{!hidden && (
				<motion.div
					className={twMerge(
						"absolute z-50 h-fit w-max rounded border bg-neutral-200 px-2 py-1.5",
						positionClass
					)}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					{title}
				</motion.div>
			)}
		</div>
	);
};

export default Tooltip;
