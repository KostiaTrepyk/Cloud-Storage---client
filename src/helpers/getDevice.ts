import { Device } from "types/localStorage";

export function getDevice(): Device {
	const toMatch = [
		/Android/i,
		/webOS/i,
		/iPhone/i,
		/iPad/i,
		/iPod/i,
		/BlackBerry/i,
		/Windows Phone/i,
	];

	const isMobile = toMatch.some((toMatchItem) => {
		return navigator.userAgent.match(toMatchItem);
	});

	return isMobile ? "mobile" : "pc";
}