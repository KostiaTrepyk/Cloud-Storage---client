import { Origins } from "../types";

export function getTransformStyles(transformOrigin: Origins): React.CSSProperties {
	let translateX: string = "0";
	let translateY: string = "0";

	switch (transformOrigin.vertical) {
		case "top":
			translateY = "-100%";
			break;
		case "center":
			translateY = "-50%";
			break;
		case "bottom":
			translateY = "0";
			break;
	}

	switch (transformOrigin.horizontal) {
		case "left":
			translateX = "-100%";
			break;
		case "center":
			translateX = "-50%";
			break;
		case "right":
			translateX = "0";
			break;
	}

	return { translate: `${translateX} ${translateY}` };
}