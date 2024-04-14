import { useCallback } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

import { getPositionStyles } from "./helpers/getPositionStyles";
import { Origins } from "./types";
import { getTransformStyles } from "./helpers/getTransformStyles";

export interface PopoverProps extends React.PropsWithChildren {
	open: boolean;
	anchorElement: React.RefObject<HTMLElement>;
	anchorOrigin?: Origins;
	transformOrigin?: Origins;
	disablePortal?: boolean;
	attrs?: React.HTMLAttributes<HTMLDivElement>;
}

const Popover: React.FC<PopoverProps> = (props) => {
	const {
		open,
		anchorElement,
		anchorOrigin = { horizontal: "left", vertical: "bottom" },
		transformOrigin = { horizontal: "right", vertical: "bottom" },
		disablePortal = false,
		children,
		attrs,
	} = props;

	const anchorPosition = anchorElement.current?.getBoundingClientRect()!;

	const validateCoords = useCallback(
		(coords: {
			x: number;
			y: number;
		}): {
			x: number;
			y: number;
		} => {
			const result = { x: coords.x, y: coords.y };

			if (window.innerWidth < result.x + anchorPosition.width + 20) {
				result.x = window.innerWidth - anchorPosition.width - 20;
			}

			if (window.innerHeight < result.y + anchorPosition.height + 20) {
				result.y = window.innerHeight - anchorPosition.height - 5;
			}

			return { x: result.x, y: result.y };
		},
		[]
	);

	if (!open) return <></>;

	if (!anchorElement.current) {
		console.warn("No anchor element");
		return <></>;
	}

	const element = (
		<div
			{...attrs}
			className={twMerge(
				"rounded bg-neutral-600 text-white",
				attrs?.className
			)}
			style={{
				position: "absolute",
				...getPositionStyles(anchorPosition, anchorOrigin),
				...getTransformStyles(transformOrigin),
				...attrs?.style,
			}}
		>
			{children}
		</div>
	);

	if (disablePortal) return element;

	/* With portal */
	const portal = document.getElementById("modal");

	if (!portal) throw new Error("Portal not found");

	return createPortal(element, portal);
};

export default Popover;
