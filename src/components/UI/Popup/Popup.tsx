import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

import Popover, { type PopoverProps } from "../Popover/Popover";

export interface PopupProps
	extends React.PropsWithChildren,
		Omit<PopoverProps, "attrs"> {
	onClose: () => void;
	containerAttrs?: React.HTMLAttributes<HTMLDivElement>;
	popoverAttrs?: React.HTMLAttributes<HTMLDivElement>;
	disablePortal?: boolean;
}

const Popup: React.FC<PopupProps> = (props) => {
	const {
		open,
		anchorElement,
		anchorOrigin = { horizontal: "left", vertical: "bottom" },
		transformOrigin = { horizontal: "right", vertical: "bottom" },
		onClose,
		children,
		containerAttrs,
		popoverAttrs,
		disablePortal = false,
	} = props;

	if (!open) return <></>;

	if (!anchorElement.current) {
		console.warn("No anchor element");
		return <></>;
	}

	const element = (
		<div
			{...containerAttrs}
			className={twMerge(
				"absolute left-0 top-0 h-full w-full",
				containerAttrs?.className
			)}
			onClick={(e) => {
				onClose();
				containerAttrs?.onClick && containerAttrs.onClick(e);
			}}
			onContextMenu={(e) => {
				e.preventDefault();
				onClose();
				containerAttrs?.onContextMenu &&
					containerAttrs.onContextMenu(e);
			}}
		>
			<Popover
				open={open}
				anchorElement={anchorElement}
				anchorOrigin={anchorOrigin}
				transformOrigin={transformOrigin}
				disablePortal
				attrs={{
					...popoverAttrs,
					onClick: (e) => {
						e.stopPropagation();
						popoverAttrs?.onClick && popoverAttrs.onClick(e);
					},
					onContextMenu: (e) => {
						e.stopPropagation();
						popoverAttrs?.onContextMenu &&
							popoverAttrs.onContextMenu(e);
					},
				}}
			>
				{children}
			</Popover>
		</div>
	);

	if (disablePortal) return element;

	// Without portal
	const portal = document.getElementById("modal");

	if (!portal) {
		throw new Error("Portal not found");
	}

	return createPortal(element, portal);
};

export default Popup;
