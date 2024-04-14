import { Origins } from "../types";

export function getPositionStyles(
	anchorPosition: DOMRect,
	anchorOrigin: Origins
): { left: number, top: number } {
	let top: number = 0;
	let left: number = 0;

	switch (anchorOrigin.vertical) {
		case "top":
			top = anchorPosition.top;
			break;
		case "center":
			top = anchorPosition.top + anchorPosition.height / 2;
			break;
		case "bottom":
			top = anchorPosition.bottom;
			break;
	}

	switch (anchorOrigin.horizontal) {
		case "left":
			left = anchorPosition.left;
			break;
		case "center":
			left = anchorPosition.left + anchorPosition.width / 2;
			break;
		case "right":
			left = anchorPosition.right;
			break;
	}

	return {
		top,
		left,
	};
}