import JSZip from "jszip";
import { FileData } from "services/types";

export async function downloadFolder(
	folderName: string,
	files: FileData[]
) {
	var zip = new JSZip();
	const folder = zip.folder(folderName);

	if (!folder) return;

	// Add files to the zip
	for (const file of files) {
		const res = await fetch(
			`http://localhost:5000/uploads/${file.filename}`
		);

		/* If did not found a file */
		if (!res.ok) {
			folder.file(
				file.originalname + ".txt",
				"Can not download this file!"
			);
			continue;
		}

		const fileContent = res.body ? await res.body.getReader().read() : null;

		if (fileContent?.value)
			/* Adding a file to zip */
			folder.file(
				file.originalname +
					"." +
					file.filename.split(".")[
						file.filename.split(".").length - 1
					],
				fileContent.value
			);
		else {
			/* ??? */
			throw new Error("No file content found!");
		}
	}

	// Generate the zip content asynchronously
	await folder.generateAsync({ type: "blob" }).then(function (blob) {
		// Create a download link
		var link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = folderName + ".zip";

		// Append the link to the DOM and trigger the click event
		document.body.appendChild(link);
		link.click();

		// Remove the link from the DOM
		document.body.removeChild(link);
	});
}