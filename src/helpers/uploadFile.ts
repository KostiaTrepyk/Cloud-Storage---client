import { cookieKeys } from "types/cookie";
import { getCookieValue } from "./cookie";
import { UploadFileBody } from "services/filesApi";

export function uploadFile({
	uploadFile,
	currentFolderId,
}: {
	uploadFile: (data: UploadFileBody) => void;
	currentFolderId: number;
}) {
	const input = document.createElement("input");
	input.setAttribute("type", "file");
	document.body.appendChild(input);
	input.click();
	input.onchange = () => {
		if (!input.files) return;

		const file = input.files[0];

		uploadFile({
			token: getCookieValue(cookieKeys.TOKEN),
			folderId: currentFolderId,
			file: file,
		});
	};

	input.parentNode?.removeChild(input);
}