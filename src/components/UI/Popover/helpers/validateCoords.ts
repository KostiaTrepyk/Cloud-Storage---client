interface Coords { 
    left: number;
    top: number;
}

const offsetTop = 5
const offsetLeft = 20

export function validateCoords (coords: Coords, boundingClientRect: DOMRect): Coords  {
	const result: Coords = { left: coords.left, top: coords.top };

	/* console.log("el: ", boundingClientRect.width + offsetLeft);
	console.log("win: ", window.innerWidth, window.scrollX);
	console.log("elpos:", window.innerWidth + window.scrollX - boundingClientRect.width - offsetLeft);
	console.log("");
 */
	if (
		window.innerWidth + window.scrollX <
		result.left + boundingClientRect.width + offsetLeft
	) {
		result.left = window.innerWidth + window.scrollX - boundingClientRect.width - offsetLeft;
	}

	if (window.innerHeight < result.top + boundingClientRect.height + offsetTop) {
		result.top = window.innerHeight - boundingClientRect.height - offsetTop;
	}

	return result
}