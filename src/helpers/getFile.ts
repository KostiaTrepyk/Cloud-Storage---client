
export function getFile(cb: (file: File) => Promise<unknown>) {
	const input = document.createElement("input");
	input.setAttribute("type", "file");

	input.addEventListener("change", async () => {
		if (!input.files || !input.files[0]) return;
		await cb(input.files[0]);
	});

	document.body.appendChild(input);
	input.click();

	input.parentNode?.removeChild(input);
}
