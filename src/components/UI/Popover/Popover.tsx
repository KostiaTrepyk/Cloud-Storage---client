import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

import { getPositionStyles } from "./helpers/getPositionStyles";
import { getTransformStyles } from "./helpers/getTransformStyles";
import { validateCoords } from "./helpers/validateCoords";
import { Origins } from "./types";

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

	const [validatedCoords, setValidatedCoords] = useState({ left: 0, top: 0 });

	const ref = useRef<HTMLDivElement>(null);

	const a = useCallback(() => {
		if (ref.current) {
			const anchorBoundingClientRect =
				anchorElement.current?.getBoundingClientRect()!;

			const popoverPositionStyles: { left: number; top: number } =
				getPositionStyles(anchorBoundingClientRect, anchorOrigin);

			const popoverBoundingClientRect =
				ref.current?.getBoundingClientRect()!;

			setValidatedCoords((prev) => {
				const result = { ...prev };
				const newValidatedCoords = validateCoords(
					popoverPositionStyles,
					popoverBoundingClientRect
				);

				if (
					newValidatedCoords.left + popoverBoundingClientRect.width >
					anchorBoundingClientRect.left /* + window.scrollX */
				) {
					result.left = newValidatedCoords.left;
				}

				result.top = newValidatedCoords.top;

				return result;
			});
		}
	}, [anchorElement, anchorOrigin]);

	useEffect(() => {
		a();

		window.addEventListener("scroll", a);
		window.addEventListener("resize", a);

		return () => {
			window.removeEventListener("scroll", a);
			window.removeEventListener("resize", a);
		};
	}, [a]);

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
				...validatedCoords,
				...getTransformStyles(transformOrigin),
				...attrs?.style,
			}}
			ref={ref}
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
